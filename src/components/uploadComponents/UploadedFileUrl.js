import React from "react";
import QRCode from "react-qr-code";

export default function UploadedFileUrl(props) {
    const qrCodeColor = "#005F50";

    return <div>
        <h1>Die Datei wurde erfolgreich hochgeladen!</h1>
        <div className="container">
            <div className="card">
                <h2 className="card-header bg-primary text-white">Ihr Download-Link</h2>
                <div className="card-body text-center">
                    <h3 className="card-title">Teilen Sie folgenden QR-Code:</h3>
                    <div>
                        <QRCode value={props.fileDownloadUrl} level={"H"} fgColor={qrCodeColor} />
                    </div>

                </div>
                <div className="card-footer text-center">
                    <h3 className="card-title">oder</h3>
                    <p className="card-text">nutzen Sie zum Download den folgenden Link:</p>
                    <a href={props.fileDownloadUrl}><strong>{props.fileDownloadUrl}</strong></a>
                </div>
            </div>
        </div>
    </div>
}