export default function SendingRequestFailed(props) {
    if(props.sendingFailed) {
        return(
            <p>Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.</p>
        );
    } else return;
}