ServerEvents.recipes(event => {
  function create_melting(input, outputFluid, amount, time, requirement) {
    event.custom({
      type: "createbigcannons:melting",
      ingredients: [input],
      results: [{ fluid: outputFluid, amount: amount }],
      processingTime: time,
      heatRequirement: requirement 
      })
    }

  function create_alloying(moltenMetal, additive, output, amount, time, requirement) {
    event.custom({
      type: "create:mixing",
      ingredients: [{ fluid: moltenMetal, amount: amount }, { tag: additive }],
      results: [{ fluid: output, amount: amount }],
      processingTime: time,
      heatRequirement: requirement
    })
  }

  event.remove({ type: "createbigcannons:melting" })

  const cannon_materials = [["cast_iron", "createbigcannons", "heated"], ["nethersteel", "createbigcannons", "superheated"]] 

  for (const material of cannon_materials) {
    create_melting({tag: "c:" + material[0] + "_ingots"}, material[1] + ":molten_" + material[0], 9000, 180, material[2])
    create_melting({tag: "c:" + material[0] + "_blocks"}, material[1] + ":molten_" + material[0], 81000, 180*9, material[2])
    create_melting({tag: "c:" + material[0] + "_nuggets"}, material[1] + ":molten_" + material[0], 1000, 180, material[2])
  }

  event.forEachRecipe({ type: "tconstruct:melting" }, recipe => {
    let json = recipe.json
    let fluid = json.get("result").get("fluid")
    let amount = json.get("result").get("amount")
    let ingredient = json.get("ingredient")
    let temperature = json.get("temperature")
    create_melting(ingredient, fluid, amount, amount*0.02, temperature > 1000 ? "superheated" : "heated")
  })

  event.forEachRecipe({ type: "tconstruct:material_melting" }, material => {
    let json = material.json
    let fluid = json.get("result").get("fluid")
    let amount = json.get("result").get("amount")
    let temperature = json.get("temperature")
    let input = json.get("input")
    let requirement = temperature > 1000 ? "superheated" : "heated"

    event.forEachRecipe( { type: "tconstruct:table_casting_material" }, cast => {
      let json = cast.json
      let cost = json.get("item_cost")
      let ingredient = json.get("result")
      

      if (json.get("cast").get("tag").toString().includes("multi_use")) {
        console.log(`{Material:${input}}`)

        create_melting(Item.of(ingredient, `{Material:${input}}`).strongNBT(), fluid, amount*cost, amount*cost*0.02, requirement)}
    })
  })
})
