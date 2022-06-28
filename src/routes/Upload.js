import React, { useState } from "react";
import axios from "axios";

import UploadedFileUrl from "../components/uploadComponents/UploadedFileUrl";

export default function Upload() {
    const uploadUrl = process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/uploadFile";

    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState("");

    let fileInput = React.createRef();

    const handleFileUpload = async (submitted) => {
        submitted.preventDefault();
        if (!fileInput.current.files[0]) {
            alert("Fehler! Sie haben keine Datei zum Upload ausgewählt.");
        } else if (fileInput.current.files[0].size > 10485760) {
            alert("Fehler! Die ausgewählte Datei ist zu groß. Es sind maximal 10 MiB pro hochzuladender Datei erlaubt.");
        } else {
            let fileUploadForm = new FormData();
            fileUploadForm.append("uploadedFile", fileInput.current.files[0], fileInput.current.files[0].name);
            setIsUploading(true);

            // upload file using axios
            let uploadResponse = await axios({
                method: "post",
                url: uploadUrl,
                data: fileUploadForm,
                headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => { return response }).catch((error) => { return error.response });

            setIsUploading(false);
            if (uploadResponse.status === 200) {
                setDownloadUrl(process.env.REACT_APP_FRONTEND_BASE_URL + "/download/" + uploadResponse.data.fileUrl);
                setUploadSuccess(true);
            } else {
                alert("Fehler beim Upload");
            }
        }

    }
    if (isUploading) {
        return <div>
            <h1>Lade hoch...</h1>
        </div>
    } else if (uploadSuccess) {
        return <UploadedFileUrl fileDownloadUrl={downloadUrl} />
    } else {
        return (
            <div>
                <h1>Eine Datei hochladen</h1>
                <div className="container">
                    <div className="card">
                        <h2 className="card-header bg-primary text-white">Upload</h2>
                        <div className="card-body">
                            <p className="card-text">Auf dieser Seite können Sie eine Datei hochladen. Anschließend erhalten Sie eine URL, über die diese Datei später beliebig oft heruntergeladen werden kann. Achten Sie darauf, kein urheberrechtlich geschütztes Material ohne Zustimmung des Urhebers hochzuladen.</p>
                            <form onSubmit={handleFileUpload}>
                                <label htmlFor="inputGroupFile04" className="form-label"> Bitte wählen Sie eine Datei zum Upload aus (10MiB max.):</label>
                                <input type="file" ref={fileInput} className="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Hochladen" />
                                <br />
                                <button className="btn btn-primary col-12" id="inputGroupFileAddon04" type="submit">Hochladen</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}