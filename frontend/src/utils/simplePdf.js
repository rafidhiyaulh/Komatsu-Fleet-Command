const escapePdfText = (text) =>
  String(text)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");

const toAscii = (str) => {
  const normalized = String(str);
  let out = "";
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    const isAllowed =
      code === 9 || code === 10 || code === 13 || (code >= 32 && code <= 126);
    out += isAllowed ? normalized[i] : "?";
  }
  return out;
};

export const createSimplePdfBlob = ({ title, lines }) => {
  const encoder = new TextEncoder();

  const safeTitle = toAscii(title || "Document");
  const safeLines = (Array.isArray(lines) ? lines : []).map((l) => toAscii(l));

  const fontSize = 12;
  const lineHeight = 14;
  const startX = 50;
  const startY = 760;

  const contentLines = [
    "BT",
    `/F1 ${fontSize} Tf`,
    `${lineHeight} TL`,
    `${startX} ${startY} Td`,
    `(${escapePdfText(safeTitle)}) Tj`,
    "T*",
    `(${escapePdfText("")}) Tj`,
    "T*",
    ...safeLines.flatMap((l) => [`(${escapePdfText(l)}) Tj`, "T*"]),
    "ET",
  ].join("\n");

  const objects = [];
  objects[1] = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  objects[2] = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  objects[3] =
    `3 0 obj\n` +
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ` +
    `/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\n` +
    `endobj\n`;

  const streamBytes = encoder.encode(contentLines);
  objects[4] =
    `4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n` +
    contentLines +
    `\nendstream\nendobj\n`;

  objects[5] = `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const header = "%PDF-1.4\n";
  const chunks = [header];
  const offsets = [0];
  let offset = encoder.encode(header).length;

  const objCount = 5;
  for (let i = 1; i <= objCount; i++) {
    offsets[i] = offset;
    chunks.push(objects[i]);
    offset += encoder.encode(objects[i]).length;
  }

  const xrefStart = offset;
  let xref = `xref\n0 ${objCount + 1}\n`;
  xref += `0000000000 65535 f \n`;
  for (let i = 1; i <= objCount; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  const trailer =
    `trailer\n<< /Size ${objCount + 1} /Root 1 0 R >>\n` +
    `startxref\n${xrefStart}\n%%EOF\n`;

  chunks.push(xref);
  chunks.push(trailer);

  const bytes = encoder.encode(chunks.join(""));
  return new Blob([bytes], { type: "application/pdf" });
};
