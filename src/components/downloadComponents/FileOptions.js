import {useState} from "react";
import axios from "axios";

import RequestStatusChangeForm from "./RequestStatusChangeForm";

export default function FileOptions(props) {
    const [requestFormExpanded, setRequestFormExpanded] = useState(false);

    const handleFileDownload = () => { // get file from WebAPI using axios and pass it to the browser to download via objectURL
        axios({
            method: "get",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/downloadFileViaId/" + props.fileId,
            responseType: "blob"
        }).then((downloadedFileResponse) => {
            // Temporären, nicht hotlink-fähigen Downloadlink erstellen, unter Zuhilfenahme von https://akashmittal.com/react-download-files-button-click/
            let downloadFile = document.createElement("a");
            downloadFile.href = window.URL.createObjectURL(downloadedFileResponse.data);
            downloadFile.download = decodeURIComponent(escape(props.fileData.fileName));
            document.getElementById('root').appendChild(downloadFile);
            downloadFile.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(downloadFile);
            }, 1000);
            //--
        }).catch((error) => {
            alert("Fehler beim Herunterladen der Datei. Möglicherweise wurde die Datei in der Zwischenzeit gelöscht oder blockiert. Bitte laden Sie die Seite neu.");
        })
    }
    const handleRequestFormExpansion = () => {
        requestFormExpanded ? setRequestFormExpanded(false): setRequestFormExpanded(true);
    }

    if(!props.fileData.isBlocked) {
        return(
            <div className="card">
                <h2 class="card-header">Datei-Optionen</h2>
                <div className="card-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="card bg-success col-md col-12 m-2">
                                <h3 class="card-header text-white">Herunterladen</h3>
                                <div className="card-body">
                                    <p className="card-text text-white">Die Datei ist nicht gesperrt und kann somit über folgende Schaltfläche heruntergeladen werden:</p>
                                    <button className="btn bg-primary col-12 text-white" onClick={handleFileDownload}>Herunterladen</button>
                                </div>
                            </div>
                            <div className="card bg-warning col-md col-12 m-2">
                                <h3 className="card-header">Blockieren</h3>
                                <div class="card-body">
                                    <p className="card-text">Du meinst, diese Datei verletzt das Urheberrecht? Beantrage hier die Blockierung: </p>
                                    <button className="btn bg-danger col-12 text-white"onClick={handleRequestFormExpansion}>Blockierung beantragen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            <RequestStatusChangeForm isExpanded = {requestFormExpanded} fileData = {props.fileData} fileId={props.fileId} blockFile = {true}/>
        </div>
        );
    } else {
        return(
        <div>
            <h2>Datei-Optionen</h2>
            <p>Die Datei ist leider gesperrt, weil sie als urheberrechtsverletzend eingestuft wurde.</p>
            <hr/>
            <p>Du meinst, dies ist ein Fehler und die Datei sollte freigegeben werden? Beantrage hier die Entsperrung: </p>
            <button onClick={handleRequestFormExpansion}>Entsperrung beantragen</button>
            <RequestStatusChangeForm isExpanded = {requestFormExpanded} fileData = {props.fileData} fileId={props.fileId} blockFile = {false}/>
        </div>
        );
    }

}