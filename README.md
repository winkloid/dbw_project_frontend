# Installationsanleitung

In dieser Datei finden Sie eine kurze Anleitung, um den Frontend-Teil der Projektlösung auszuführen.

Stellen Sie zuvor sicher, dass die neueste Version von NPM auf Ihrem Gerät installiert ist.

## 1. Installation der Dependencies

Alle Dependencies der Projektlösung sind in dbw_project_frontend/package.json aufgeführt. Um diese automatisch durch den NPM installieren zu lassen, navigieren Sie zunächst in den Projektordner des Frontend-Teils der Projektlösung. Hierzu können Sie unter Windows beispielsweise Windows PowerShell verwenden:

- Öffnen Sie ein Terminalfenster

- Navigieren Sie mithilfe des cd-Befehls in das "dbw_project_frontend"-Verzeichnis, z.B.:

  - ```
    cd C:\Users\MaxMustermann\Downloads\dbw_project_frontend
    ```

- Führen Sie in diesem Verzeichnis über Ihr Terminal nun den folgenden Befehl aus:

  - ```
    npm install
    ```

- Sie sollten nun ein neues Verzeichnis "node_modules" innerhalb des "dbw_project_frontend"-Verzeichnisses sehen, in dem die Dateien der notwendigen Dependencies enthalten sind.

- Zum Schluss starten Sie den Frontend-Teil der Projektlösung über Ihr Terminal (immer noch im "dbw_project_frontend"-Verzeichnis befindlich) über folgenden Befehl:

  - ```
    npm start
    ```

- Nach Komplettierung des darüber ausgelösten Vorgangs sollte der Frontend-Teil der Anwendung über http://localhost:3000 auf Ihrem Gerät erreichbar sein. Wenn Sie ihn wieder beenden möchten, schließen Sie entweder das entsprechende Terminalfenster oder drücken Sie STRG + C und bestätigen das Ende der Ausführung.

