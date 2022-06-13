export default function SendingRequestFailed(props) {
    if(props.sendingFailed) {
        return(
            <div>
                <br />
            <div className="card bg-danger col-12 ">
                <h3 className="card-header text-white">Senden der Anfrage fehlgeschlagen.</h3>
                <div className="card-body">
                    <p className="card-text text-white">Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.</p>
                </div>
            </div>
            </div>
        );
    } else return;
}