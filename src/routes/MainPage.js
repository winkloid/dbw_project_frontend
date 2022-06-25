export default function MainPage() {
    return(
        <div className="container">
            <div className="card">
            <div className="card-header">
                <h1 className = "card-title text-center">Willkommen bei winkloidShare!</h1>
            </div>
            <div className="card-body">
            <p className="card-text">Gelangen Sie hier zur Upload-Seite: </p>
            <a className="btn btn-primary col-12" href="upload">Upload-Seite</a>
            </div>
            <div className="card-footer">
            <p>Administratoren hier entlang: </p>
            <a className="btn btn-primary col-12" href="administrator">Administration</a>
            </div>
            </div>
        </div>
    );
}