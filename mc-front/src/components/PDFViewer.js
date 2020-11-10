import React from 'react'
 
import PDFView from 'pdf-viewer-reactjs'
 
const PDFViewer = (props) => {
    const { manual } = props;

    console.log("pdfviewer loading");

    if (!manual || manual.length === 0) 
        return <p>Nessun manuale trovato.</p>;

    return (
        <div>
            
            <PDFView
                document={{
                    url: manual.url,
                }}
            />
        </div>
    )
}
 
export default PDFViewer