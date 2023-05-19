//@ts-ignore
const armarListadoUsuarios = Handlebars.compile(`
{{#if hayUsuarios}}
<ul>
    {{#each usuarios}}
    <li>Nombre: {{this.nombre}} | email: {{this.email}}</li>
    {{/each}}
</ul>
{{else}}
<p>no hay usuarios para mostrar</p>
{{/if}}
`)