import { api } from "../api/productApi";
import { toast } from "react-toastify";

export default function ImportExportButtons() {
  const importFile = (e) => {
    const file = e.target.files[0];
    api.importCSV(file).then(()=> toast.success("Imported."));
  };

  const exportCSV = () => {
    api.exportCSV().then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      a.click();
    });
  };

  return (
    <>
      <input type="file" id="upload" hidden onChange={importFile}/>
      <button onClick={()=>document.getElementById("upload").click()}><i class="ri-file-excel-fill"></i> ImportCsv</button>
      <button onClick={exportCSV}><i class="ri-folder-download-fill"></i> Export</button>
    </>
  );
}
