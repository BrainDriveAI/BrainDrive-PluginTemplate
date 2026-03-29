# Plugin Rename Checklist

After cloning this template, use this checklist to rename everything for your plugin.

**Example:** Renaming to "MyAwesomePlugin" with module "MyAwesomeModule"

---

## Critical Rule

> **Plugin name and module name MUST be different!**
>
> - Bad: Plugin = "MyPlugin", Module = "MyPlugin"
> - Good: Plugin = "MyPlugin", Module = "MyPluginModule"
>
> BrainDrive can't distinguish between them if they're the same.

---

## Checklist

### 1. Folder Name
- [ ] Rename the cloned folder from `BrainDrive-PluginTemplate` to `MyAwesomePlugin`

### 2. package.json
- [ ] Update `name` to `"my-awesome-plugin"`
- [ ] Update `description` to describe your plugin

### 3. webpack.config.js (lines 7-9)
- [ ] Update `PLUGIN_NAME` to `"MyAwesomePlugin"`
- [ ] Update `PLUGIN_MODULE_NAME` to `"MyAwesomeModule"` (must differ from plugin!)
- [ ] Update `PLUGIN_PORT` to an available port (e.g., 3004)

### 4. Source Files
- [ ] Rename `src/PluginTemplate.tsx` to `src/MyAwesomePlugin.tsx`
- [ ] Rename `src/PluginTemplate.css` to `src/MyAwesomePlugin.css`

### 5. Inside Your Renamed .tsx File
- [ ] Update CSS import: `import './MyAwesomePlugin.css'`
- [ ] Update class name: `class MyAwesomePlugin extends React.Component`
- [ ] Update export: `export default MyAwesomePlugin`

### 6. src/index.tsx
- [ ] Update import: `import MyAwesomePlugin from './MyAwesomePlugin'`
- [ ] Update export: `export default MyAwesomePlugin`
- [ ] Update metadata object name and description
- [ ] Update JSX references in dev mode render

### 7. lifecycle_manager.py
In `plugin_data` (around line 101):
- [ ] Update `name` to `"MyAwesomePlugin"`
- [ ] Update `description`
- [ ] Update `scope` to `"MyAwesomePlugin"`
- [ ] Update `plugin_slug` to `"MyAwesomePlugin"`
- [ ] Update `source_url` to your GitHub repo
- [ ] Update `update_check_url` to your GitHub releases URL

In `module_data` (around line 129):
- [ ] Update `name` to `"MyAwesomeModule"` (DIFFERENT from plugin name!)
- [ ] Update `display_name`
- [ ] Update `description`

### 8. Optional: src/types.ts
- [ ] Rename `PluginTemplateProps` to `MyAwesomePluginProps`
- [ ] Rename `PluginTemplateState` to `MyAwesomePluginState`

---

## Quick Verification

After renaming, run:

```bash
npm run build
```

Check that `dist/remoteEntry.js` is created. If the build succeeds, your renaming is complete!

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Plugin and module have same name | Confusing errors, components don't load | Make module name different |
| Forgot to update import in index.tsx | "Module not found" error | Update import path |
| Forgot to update CSS import | Style errors or missing styles | Update CSS import path |
| Mismatched names in lifecycle_manager.py | Plugin doesn't appear in Page Builder | Ensure name, scope, slug match |
