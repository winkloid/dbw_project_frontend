import React from "react";
import QRCode from "react-qr-code";

export default function UploadedFileUrl(props) {
    const qrCodeColor = "#005F50";

    return <div>
        <h1>Die Datei wurde erfolgreich hochgeladen!</h1>
        <p>Teilen Sie folgenden QR-Code:</p>
        <div>
            <QRCode value={props.fileDownloadUrl} level={"H"} fgColor={qrCodeColor}/>
        </div>
        <p>oder nutzen Sie zum Download den folgenden Link: <strong>{props.fileDownloadUrl}</strong></p>
    </div>
}