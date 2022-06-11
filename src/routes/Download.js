import { useParams } from "react-router-dom";

export default function Download() {
    let params = useParams();
    return(
        <div>
            <h1>Download</h1>
            <p>DownloadId: {params.fileId}</p>
        </div>
    );
}