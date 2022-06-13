import {useEffect, useState} from "react";
import axios from "axios";

import StatusChangeRequest from "../components/administratorComponents/StatusChangeRequest";

export default function Administrator() {
    const [requestOverview, setRequestOverview] = useState([]);
    const [gettingRequestOverview, setGettingRequestOverview] = useState(true); // Bool, der angibt, ob gerade daten abgerufen werden
    const [retrievedOverviewData, setRetrievedOverviewData] = useState(false); // Bool, der angibt, ob die Request-Daten bisher schon erfolgreich heruntergeladen werden konnten
    const [isEntrySelected, setIsEntrySelected] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState();

    useEffect(() => {
        getRequestOverview();
    }, []);

    const getRequestOverview = async () => {
        setGettingRequestOverview(true);
        let requestOverviewResponse = await axios({
            method: "get",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/blockingStatusChangeRequests",
        }).then((overViewResponse) => {
            return overViewResponse;
        }).catch((error) => {
            return error.response;
        });
        if(requestOverviewResponse.status === 200) {
            setRequestOverview(requestOverviewResponse.data);
            setRetrievedOverviewData(true);
        } else {
            setRetrievedOverviewData(false);
        }
        setGettingRequestOverview(false);
    }

    // dient dazu, eine Request der Request-Overview als ausgewählt zu setzen
    const handleEntrySelection = (entryIndex) => {
        setSelectedEntry(entryIndex);
        setIsEntrySelected(true);
    }

    if(gettingRequestOverview) {
        return(
            <h1>Lade Anfrageübersicht...</h1>
        );
    } else if(retrievedOverviewData && !isEntrySelected) {
        return(
            <div>
                <h1>Übersicht über Blocking- und Unblocking-Anfragen:</h1>
                <p><strong>Info:</strong> In der folgenden Tabelle beschreibt<span role="img" aria-label="sperren">❌</span>, dass die betroffene Datei entsprechend der Anfrage <strong>gesperrt</strong> werden soll und <span role="img" aria-label="entsperren">✔️</span> gibt, an, dass sie <strong>entsperrt</strong> werden soll.</p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Datum</th>
                            <th>Zeit</th>
                            <th>Dateiname</th>
                            <th>Auszuführende Aktion</th>
                            <th>Auswählen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestOverview.map((request, requestIndex) => (
                            <StatusChangeRequest key={request._id} requestIndex={requestIndex} requestData={request} handleEntrySelection={handleEntrySelection} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else if(retrievedOverviewData && isEntrySelected) {
        return(
            <h1>Details:</h1>
        );
    } else {
        return(
            <div>
                <h1>Fehler beim Laden der Übersicht von Anfragen.</h1>
                <p>Bitte stellen Sie sicher, dass das Backend läuft und durch das Frontend erreicht werden kann.</p>
            </div>
        );
    }
}