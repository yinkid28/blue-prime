import Navbar from "@/components/Layout/Nav/navbar";
import { BreadCrumbs, Button } from "@/components/utils";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import { Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import yaml from "js-yaml";
const WebberLayout = dynamic(() => import("@/components/Layout/layout"), {
  ssr: false,
});
export default function ApiDefinition() {
  const { api } = useApi();
  const router = useRouter();
  const [view, setView] = useState<string>("info");
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const { loading, setLoading } = useOnboarding();

  useEffect(() => {
    setLoading(false);
  }, []);
  const hightlightWithLineNumbers = (input: string, language: any) =>
    highlight(input, language)
      .split("\n")
      .map(
        (line: string, i: number) =>
          `<span class='editorLineNumber'>${i + 1}</span>${line}`
      )
      .join("\n");

  async function loadAndParseYaml(url: string) {
    const response = await fetch(url);
    const text = await response.text();
    return yaml.load(text);
  }
  return (
    <>
      <WebberLayout>
        <Navbar title={`${api?.title}`} />
        <BreadCrumbs
          // breadCrumbItems={breadCrumbs}
          breadCrumbActiveItem={`${api?.title}-Endpoints`}
        />
        <div className="p-5">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
            padding={10}
            textareaId="codeArea"
            className="editor  bg-black h-[80vh] rounded-lg text-white"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </WebberLayout>
    </>
  );
}
