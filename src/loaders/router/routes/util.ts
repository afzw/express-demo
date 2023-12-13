function addRoutes(droutes: App.Route[], sroutes: App.Route[]) {
  for (const route of sroutes) {
    droutes.push(route)
  }
}

export { addRoutes }
