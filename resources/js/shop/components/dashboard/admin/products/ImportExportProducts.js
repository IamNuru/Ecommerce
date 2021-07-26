import React, { useRef , useState} from 'react'

const ImportExportProducts = () => {
    const importFile = useRef(null)
    const [importFileName, setImportFileName] = useState(null)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    const handleChooseFile = e =>{
        setImportFileName(importFile.current.files[0].name)
      }

      const exportProducts = () =>{
        axios.get(`${process.env.MIX_APP_API_URL}/products/export`)
        .then(res =>{
          alert('downloading')
        }).catch(err =>{
          console.log(err.response)
        })
      }
    return (
        <div className="flex flex-wrap">
            <div className="relative mx-1">
              <button className="w-24 bg-indigo-600 hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center">
                  <svg className="h-4 w-4" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path className="fill-current text-white bg-white" d="M17 22v2h-10v-2h10zm0-4h-10v2h10v-2zm-10-7v5h10v-5h6l-11-11-11 11h6z"/>
                  </svg>
                  <span className="ml-2">Import</span>
              </button>
              <input onChange={() => handleChooseFile()} ref={importFile} className="py-2 cursor-pointer top-0 absolute block opacity-0 w-24 pin-r pin-t" type="file" name="vacancyImageFiles" />
            </div>
            {
                importFileName && <div className="flex">
                <div className="py-1">{importFileName}</div>
                <button type="submit" className="bg-green-500 rounded-md hover:bg-blue-600 text-white font-semibold py-1 px-4">Submit</button>
              </div>
              }
            <div className="relative mx-1">
              <form action="/products/export" method="get">
              <button type="submit" className="w-24 bg-indigo-600 hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center">
                  <svg className="h-4 w-4" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path className="fill-current text-white" d="M7 2v-2h10v2h-10zm0 4h10v-2h-10v2zm10 7v-5h-10v5h-6l11 11 11-11h-6z"/>
                  </svg>
                  <span className="ml-2">Export</span>
              </button>
              </form>
              </div>
        </div>
    )
}

export default ImportExportProducts
