import React, { useState } from "react";
import axios from "axios";

    const GuestChatPage = () => {
    const [uploadedText, setUploadedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState(""); // Added state for file name
    const [auditResults, setAuditResults] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleClearTranscript = () => {
        setUploadedText(""); // Reset the uploaded text
        setUploadedFileName(""); // Clear file name
        setUploadError(""); // Clear any previous errors
    };

    const handleFileUpload = async (file) => {
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setUploadError("File size exceeds the 2MB limit. Please upload a smaller file.");
                return;
            }

            const allowedFileTypes = ["application/pdf", "application/json", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/markdown"];
            if (!allowedFileTypes.includes(file.type)) {
                setUploadError("Unsupported file type. Please upload a .docx, .pdf, or .txt.");
                return;
            }

            setUploadError(null); // Clear previous errors

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log("Backend Response:", response.data);

                // Parse response and handle appropriately
                if (response.data && typeof response.data === "object") {
                    const { message, text, fileName } = response.data; // Extract 'fileName' from backend
                    setUploadedFileName(fileName); // Store the file name in state
                    setUploadedText(`Message: ${message}\nTranscript:\n${text}`); // Include the extracted text
                } else {
                    setUploadedText(response.data); // Handle plain text response (if backend returns plain text)
                }
            } catch (error) {
                console.error("Error uploading file:", error);
                setUploadError("Failed to upload file. Please try again.");
            }
        }
    };

    const onDrop = (event) => {
        event.preventDefault();
        setUploadError(""); // Clear previous errors
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleAudit = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/assistant/audit`,
                {
                    transcript: uploadedText,
                    fileName: uploadedFileName,
                }
            );
            setAuditResults(response.data);
        } catch (error) {
            console.error("Error auditing transcript:", error);
            alert("Failed to audit transcript. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };


    return (
        <div className="flex flex-col h-screen">
            {/* Top Banner */}
            <header className="bg-gray-200 text-black font-bold text-xl p-4">
                Botsie's Blocks
            </header>

            {/* Main Content */}
            <div className="flex flex-1 bg-gray-100">
                {/* Left Panel */}
                <div className="w-1/3 bg-white p-4 m-2 rounded shadow flex flex-col">
                    {uploadedText ? (
                        // After file upload view
                        <>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold mb-2">Transcript Details</h3>
                                <button
                                    onClick={handleClearTranscript}
                                    className="text-red-500 hover:underline mb-1"
                                    style={{ fontSize: '12px' }}
                                >
                                    Clear Transcript
                                </button>
                            </div>
                            <div className="mt-4 p-2 border rounded bg-gray-50 overflow-y-auto" style={{ maxHeight: "65vh" }}>
                            <div>
                                <pre className="text-sm whitespace-pre-wrap">
                                    {uploadedFileName && `${uploadedFileName}\n`}
                                    {uploadedText.replace("Message: ", "").replace("Transcript:\n", "")}
                                </pre>

                            </div>


                            </div>
                            <button
                                onClick={handleAudit}
                                className="bg-teal-500 text-black font-bold py-2 px-4 rounded hover:bg-teal-600 mt-4"
                                disabled={!uploadedText}
                            >
                                Audit Transcript
                            </button>
                        </>
                    ) : (
                        // Default view before file upload
                        <>
                            <h2 className="text-lg font-bold mb-4">Add a Transcript</h2>
                            <p className="text-sm mb-4">
                                Upload a coaching transcript file. <strong>Supported file types:</strong> .docx, .pdf, and .txt
                            </p>
                            <div
                                className="flex flex-1 justify-center items-center border-2 border-dashed border-gray-400 rounded-lg bg-gray-50 mb-4"
                                style={{ height: "50%" }}
                                onDrop={onDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 16l4-4m0 0l4 4m-4-4v12"
                                        />
                                    </svg>
                                    <span className="text-gray-500">
                                        Drag & drop or <span className="text-blue-500 underline">choose a file</span> to upload
                                    </span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(e.target.files[0])}
                                    />
                                </label>
                            </div>

                            {uploadError && <p className="text-red-500 text-sm mb-4">{uploadError}</p>}
                        </>
                    )}
                </div>

                {/* Center Panel */}
                <div className="w-1/3 bg-white p-4 m-2 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Audit Results</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500"></div>
                        </div>
                    ) : auditResults ? (
                        <div>
                            <ul className="list-disc pl-5">
                                <li><strong>Clarity:</strong> {auditResults.Scores.Clarity}</li>
                                <li><strong>Engagement:</strong> {auditResults.Scores.Engagement}</li>
                                <li><strong>Relevance:</strong> {auditResults.Scores.Relevance}</li>
                                <li><strong>Actionable Feedback:</strong> {auditResults.Scores["Actionable Feedback"]}</li>
                            </ul>
                            <p className="mt-4"><strong>Overall Evaluation:</strong> {auditResults["Overall Evaluation Summary"]}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Audit results will appear here.</p>
                    )}
                </div>


                {/* Right Panel */}
                <div className="w-1/3 bg-white p-4 m-2 rounded shadow">
                    <h2 className="text-lg font-bold mb-4">Insights</h2>
                    <p className="text-sm text-gray-500">Placeholder for future features.</p>
                </div>
            </div>

            {/* Bottom Banner */}
            <footer className="bg-gray-200 text-center text-sm p-2">
                Human in the loop is key.
            </footer>
        </div>
    );
};

export default GuestChatPage;
