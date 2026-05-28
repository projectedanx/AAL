const fs = require('fs');

const appContent = fs.readFileSync('App.tsx', 'utf8');

// 1. Inject import
let newContent = appContent.replace(
  "import Header from './components/Header';",
  "import Header from './components/Header';\nimport MultiAgentPanel from './components/MultiAgentPanel';"
);

// 2. Inject state
newContent = newContent.replace(
  "const [presets, setPresets] = useState<PromptPreset[]>([]);",
  "const [presets, setPresets] = useState<PromptPreset[]>([]);\n  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState(false);"
);

// 3. Inject prop to Header
newContent = newContent.replace(
  "<Header />",
  "<Header onToggleAgentPanel={() => setIsAgentPanelOpen(!isAgentPanelOpen)} />"
);

// 4. Inject Panel render before closing </div>
newContent = newContent.replace(
  "</footer>\n    </div>",
  "</footer>\n      <MultiAgentPanel isOpen={isAgentPanelOpen} onClose={() => setIsAgentPanelOpen(false)} />\n    </div>"
);

fs.writeFileSync('App.tsx', newContent);
console.log("App.tsx patched successfully.");
