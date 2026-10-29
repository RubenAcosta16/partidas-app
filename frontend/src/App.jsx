import { useState } from "react";

const App = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    const response = await fetch("http://localhost:3000/partida", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "partida.pptx";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert("Error al generar el PowerPoint");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Generar PowerPoint</button>
    </form>
  );
};

export default App;
