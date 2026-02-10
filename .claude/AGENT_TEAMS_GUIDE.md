# Agent Teams - Guía de Uso para TC Insurance

## ¿Qué son los Agent Teams?

Los Agent Teams permiten coordinar múltiples instancias de Claude Code trabajando juntas en paralelo. Cada teammate tiene su propio contexto y pueden comunicarse entre sí.

## Cuándo Usar Agent Teams

### ✅ Casos de Uso Ideales

1. **Desarrollo de nuevas features cross-layer**
   ```
   Create an agent team to add a new insurance quote calculator:
   - One teammate for the React form component
   - One teammate for the API route handler
   - One teammate for validation and types
   ```

2. **Refactoring de módulos independientes**
   ```
   Create an agent team to modernize the blog section:
   - One teammate to optimize the BlogList component
   - One teammate to improve the blog post pages
   - One teammate to enhance SEO and metadata
   ```

3. **Research y análisis paralelo**
   ```
   Create an agent team to research performance optimizations:
   - One teammate analyzing bundle size
   - One teammate reviewing image optimization
   - One teammate checking Core Web Vitals
   ```

4. **Testing paralelo**
   ```
   Create an agent team to improve test coverage:
   - One teammate writing unit tests for components
   - One teammate writing integration tests for API routes
   - One teammate adding E2E tests with Playwright
   ```

### ❌ Cuándo NO Usar Agent Teams

- Ediciones simples de un solo archivo
- Cambios secuenciales que dependen uno del otro
- Tareas que requieren context compartido del mismo código
- Quick fixes o debugging simple

## Ejemplos Específicos para TC Insurance

### 1. Agregar Nueva Sección al Homepage
```
Create an agent team to add a "Why Choose Us" section:
- Teammate 1: Design and implement the section component with Swiss design
- Teammate 2: Add GSAP animations for scroll reveals
- Teammate 3: Write content and optimize for SEO
```

### 2. Mejorar Performance del Blog
```
Create an agent team to optimize blog performance:
- Teammate 1: Implement image lazy loading in blog posts
- Teammate 2: Add ISR (Incremental Static Regeneration) to blog pages
- Teammate 3: Optimize font loading and critical CSS
```

### 3. Agregar Nuevos Servicios
```
Create an agent team to add three new insurance service pages:
- Teammate 1: Life insurance page
- Teammate 2: Auto insurance page
- Teammate 3: Home insurance page
Each following the existing servicios page structure
```

## Comandos Básicos

### Iniciar un Team
Simplemente pide a Claude que cree un team:
```
Create an agent team with 3 teammates to [describe task]
```

### Controlar el Team
- **Mensaje directo**: En modo in-process, usa Shift+Up/Down para seleccionar teammate
- **Ver progreso**: Press Ctrl+T para ver la task list compartida
- **Shutdown teammates**: Pide al lead "Ask [teammate] to shut down"
- **Cleanup**: Cuando termines, "Clean up the team"

### Modos de Display
- **In-process** (default): Todos en el mismo terminal
- **Split panes**: Requiere tmux o iTerm2
  ```bash
  claude --teammate-mode split
  ```

## Best Practices para TC Insurance

1. **Evita conflictos de archivos**: Asigna diferentes componentes/rutas a cada teammate
2. **Usa el design system**: Todos los teammates deben seguir `.claude/rules/swiss-design.md`
3. **Mantén consistencia**: Asegura que todos los teammates usan las mismas convenciones de CLAUDE.md
4. **Review antes de merge**: El lead debe sintetizar y revisar el trabajo de todos

## Troubleshooting

### Teammates no aparecen
- Verifica que `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` está en `.claude/settings.json`
- Reinicia la sesión de Claude Code

### Demasiados prompts de permisos
- Agrega permisos comunes a `.claude/settings.json` antes de crear el team

### Lead termina antes de tiempo
- Di explícitamente: "Wait for your teammates to complete their tasks"

### Conflictos en el mismo archivo
- Reorganiza las tareas para que cada teammate trabaje en archivos diferentes

## Recursos

- [Documentación oficial de Agent Teams](https://code.claude.com/docs/en/agent-teams)
- Ver `CLAUDE.md` sección "Agent Teams" para más detalles
- Compara con subagents: los agent teams son para trabajo colaborativo, subagents para tareas focused

## Notas Importantes

- Agent teams son **experimentales** y pueden tener limitaciones
- Usan más tokens que una sesión simple (cada teammate es una instancia independiente)
- No se puede resumir una sesión con teammates in-process activos
- Siempre limpia el team cuando termines: "Clean up the team"
