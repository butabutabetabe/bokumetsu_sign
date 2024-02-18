function submit(canvas) {

  const signatureUrl = saveSignatureImage(canvas);
}

function saveSignatureImage(canvas){
  const today = new Date();
  const datetimeString = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyyMMddHHmmss');
  const folderId = "フォルダID";

  if (folderId === '') throw Error(`署名を保存するGoogleドライブのフォルダIDを指定してください`);

		const signature = canvas.replace('data:image/png;base64,', '');;
    const decodedSignature = Utilities.base64Decode(signature);
  const contentType = 'image/png';
  const fileName = `署名-`+ datetimeString + `.png`;
  const blob = Utilities.newBlob(decodedSignature, contentType, fileName);

  const newFile = DriveApp.getFolderById(folderId).createFile(blob);
  return newFile.getUrl();
}