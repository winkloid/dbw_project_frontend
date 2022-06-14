import { useEffect, useState } from "react";
import axios from "axios";

import StatusChangeRequest from "../components/administratorComponents/StatusChangeRequest";
import StatusChangeRequestInformation from "../components/administratorComponents/StatusChangeRequestInformation";

export default function Administrator() {
    const [requestOverview, setRequestOverview] = useState([]); // die Liste aller Requests
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
        if (requestOverviewResponse.status === 200) {
            setRequestOverview(requestOverviewResponse.data);
            setRetrievedOverviewData(true);
        } else {
            setRetrievedOverviewData(false);
        }
        setGettingRequestOverview(false);
    }

    // dient dazu, eine Request der Request-Overview als ausgewählt zu setzen
    const handleEntrySelection = (entryIndex) => {
        setSelectedEntry(requestOverview[entryIndex]);
        setIsEntrySelected(true);
    }

    if (gettingRequestOverview) {
        return (
            <h1>Lade Anfrageübersicht...</h1>
        );
    } else if (retrievedOverviewData && !isEntrySelected) {
        return (
            <div>
                <h1>Übersicht über Blocking- und Unblocking-Anfragen</h1>
                <div className="container">
                    <div className="card">
                        <h2 className="card-header bg-light">Information</h2>
                        <div className="card-body">
                            <p className="card-text">In der folgenden Tabelle beschreibt<span role="img" aria-label="sperren">❌</span>, dass die betroffene Datei entsprechend der Anfrage <strong>gesperrt</strong> werden soll und <span role="img" aria-label="entsperren">✔️</span> gibt an, dass sie <strong>entsperrt</strong> werden soll.</p>
                        </div>
                    </div>
                    <br />
                    <div className="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead class="bg-primary text-white">
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
                    {requestOverview.length === 0 ? (<p className="text-center">Aktuell sind keine Anfragen vorhanden, die moderiert werden müssen.</p>) : (<p></p>)}
                    </div>
                </div>
            </div>
        );
    } else if (retrievedOverviewData && isEntrySelected) {
        return (
            <StatusChangeRequestInformation entry={selectedEntry} />
        );
    } else {
        return (
            <div className="card bg-danger">
                <div className="card-header">
                    <h1 className="text-white">Fehler beim Datenabruf</h1>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-white">Abfragen konnten nicht geladen werden</h2>
                    <p className="card-text text-white">Bitte überprüfen Sie Ihre Internetverbindung. Bitte stellen Sie zudem sicher, dass das Backend läuft und durch das Frontend erreicht werden kann.</p>
                </div>
            </div>
        );
    }
}