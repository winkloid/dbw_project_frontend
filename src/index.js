import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import MainPage from "./routes/MainPage";
import Administrator from "./routes/Administrator";
import Upload from "./routes/Upload";
import Download from "./routes/Download";
import NotFound from "./routes/NotFound";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<MainPage />}/>
                    <Route path="administrator" element={<Administrator />}/>
                    <Route path="upload" element={<Upload />}/>
                    <Route path="/download/:fileId" element={<Download />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>
);