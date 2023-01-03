import axios from "axios"; 
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { motion } from "framer-motion";
import { javascript } from "@codemirror/lang-javascript";
import Editor from "@monaco-editor/react";
import Macbook from "../../assets/macbook.svg";
import NewWindow from 'react-new-window'
import Below from "../../assets/below.svg"; 
const HTMLViewer = ({ html }) => {
    useEffect(() => {
      const viewerWindow = window.open('', 'HTML Viewer', 'width=600,height=400');
      ReactDOM.render(<HTMLViewer html={html} />, viewerWindow.document.body);
    }, []);
  
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
function Compiler() {
     
  const onChange = React.useCallback((value, viewUpdate) => { 
    setCode(value);
  }, []);
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    setCode(value);

  } 

  const [data, setData] = useState(null);
  const [defaultCode, setDefaultCode] = useState("import java.util.*;\npublic class Main {\npublic static void main(String[] args) {\nScanner sc=new Scanner(System.in);\nint n=sc.nextInt();\nSystem.out.println(n);\n}\n}")
  const [code, setCode] = React.useState(null);
    const [input, setInput] = useState("0");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("java");
  const [openOutput, setopenOutput] = useState(false); 
  const[status,setStatus]=useState("");
  let intervalId ;
 

    //   if(language==="java"){
    //       setDefaultCode(`import java.util.*;/npublic class Main {/npublic static void main(String[] args) {/nScanner sc=new Scanner(System.in);/nint n=sc.nextInt();/nSystem.out.println(n);/n}/n}`)
    //     }
    
    const [html, setHTML] = React.useState('');

  const handleSubmit2 = (event) => {
    // event.preventDefault();
    console.log(event);
    setHTML(event);
    
  };
  const handleSubmit = async () => {
      const payload = {
        language,
        code,
        input
      };
    if(language!="html"){
    setopenOutput(true); 
    try {
      const  datanew  = await axios.post(
        // "https://api.regexnatives.in/compiler/run",
        "http://localhost:8000/run",
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(datanew?.data.output); 
      setResponse(datanew?.data.output);
      
       
    } catch (err) {
        console.log(err.response.data.err.stderr)
      console.log(err.response.data.err.stderr.toLowerCase().slice(err.response.data.err.stderr.toLowerCase().indexOf("error"),err.response.data.err.stderr.toLowerCase().lastIndexOf("generated")));
      setResponse(err.response.data.err.stderr.toLowerCase().slice(err.response.data.err.stderr.toLowerCase().indexOf("error"),err.response.data.err.stderr.toLowerCase().lastIndexOf("generated")))
    }
}
else{
    handleSubmit2(code);
}
  };
  console.log(response); 
  const [openLangSelect, setOpenLangSelect] = useState(false);
  const languageExtension = {
    cpp: "cpp",
    c: "c",
    python: "py",
    java: "java",
    javaScript: "js",

  }
  console.log(defaultCode);
  useEffect(() => {}, [language]);
  return (
    <>
    <div className="new-component">
     
    
     </div>

      <div className="Compiler">
        <h1>Powerful, Fast, and Easy-to-Use Code Compiler</h1>
        <div className="editor-flex">
            
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="editor-wrap"
        >
          <div className="editor-component">
            {openOutput ? (
              <div className="output-component">
                <div className="output-header">
                  <p>Output :</p>
                </div>
                <div className="output">
                  {response === null ? (
                    <p>There is some error</p>
                  ) : (
                    <> 
                    <p>{response?response?.stdout:"loading"}</p> 
                    </>
                  )}
                </div>
                <div className="ok-btn">
                  <button
                    onClick={() => {
                      setopenOutput(false);
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            ) : null}

            <div className="language-select">
              <p
                onClick={() => {
                  setOpenLangSelect(!openLangSelect);
                }}
              >
                langauge{" "}
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1L6.42252 6.49297C6.20263 6.75684 5.79737 6.75684 5.57748 6.49297L1 1"
                    stroke="#75FBB4"
                    stroke-width="1.55"
                  />
                </svg>
              </p>
              {openLangSelect ? (
                <>
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="language-box"
                  >
                    <p
                      onClick={() => {
                        setLanguage("cpp");
                        setOpenLangSelect(false);
                      }}
                      className={language === "cpp" ? "selected-language" : ""}
                    >
                      Cpp
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("c");
                        setOpenLangSelect(false);
                      }}
                      className={language === "c" ? "selected-language" : ""}
                    >
                      C
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("py");
                        setOpenLangSelect(false);
                      }}
                      className={
                        language === "py" ? "selected-language" : ""
                      }
                    >
                      Pyhton
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("java");
                        setDefaultCode(`import java.util.*;/npublic class Main {/npublic static void main(String[] args) {/nScanner sc=new Scanner(System.in);/nint n=sc.nextInt();/nSystem.out.println(n);/n}/n}`)
                        setOpenLangSelect(false);
                      }}
                      className={language === "java" ? "selected-language" : ""}
                    >
                      Java
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("js");
                        setOpenLangSelect(false);
                      }}
                      className={
                        language === "js" ? "selected-language" : ""
                      }
                    >
                      Javascript
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("html");
                        setOpenLangSelect(false);
                      }}
                      className={language === "html" ? "selected-language" : ""}
                    >
                      Html
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("css");
                        setOpenLangSelect(false);
                      }}
                      className={language === "css" ? "selected-language" : ""}
                    >
                      CSS
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("XML");
                        setOpenLangSelect(false);
                      }}
                      className={language === "XML" ? "selected-language" : ""}
                    >
                      XML
                    </p>
                    <p
                      onClick={() => {
                        setLanguage("jsx");
                        setOpenLangSelect(false);
                      }}
                      className={language === "jsx" ? "selected-language" : ""}
                    >
                      JSX
                    </p>
                  </motion.div>
                </>
              ) : null}
            </div>
            <div className="three-circle">
              <div className=""></div>
              <div className=""></div>
              <div className=""></div>
            </div>
            <div className="file-name">
              <p>index.js</p>
            </div>
            {/* <CodeMirror
              value="console.log('hello world!');"
              theme="dark"
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            /> */}
             <Editor
     height="500px"
     width={"77.7%"}
     theme="vs-dark"
     defaultLanguage={language}
     language={language}
     defaultValue={language==="java"?defaultCode:"console.log('hello world!');"}
     onChange={handleEditorChange}
     />
            <div className="btns compiler-btn">
              <button onClick={handleSubmit} className="">
                Compile{" "}
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6.49297 5.57748C6.75684 5.79737 6.75684 6.20263 6.49297 6.42252L1 11"
                    stroke="#1D1D1D"
                    stroke-width="1.55"
                  />
                </svg>
              </button>
            </div>
            <img src={Below} alt="" />
          </div>
        </motion.div>
            <div className="input-flex">
                <div className="input-comp">
                    <textarea onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Input :" />
                </div>
                <div className="input-status">
                    <p>Execution Time : <span>{response?.elapsedTime} sec</span></p>
                    <p>External Memory  : <span>{response?.memoryUsage?.external} </span></p>
                </div>
            </div>
        

        </div>
        
      </div>
    </>
  );
}

export default Compiler;
