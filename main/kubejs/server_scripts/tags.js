ServerEvents.tags("item", event => {
  let materials = [
    ["createbigcannons", "cast_iron"], 
    ["createbigcannons", "nethersteel"]]

  for (const material of materials) {
    console.log("Adding " + material[0] + ":" + material[1] + " to blocks!")
    event.add("c:" + material[1] + "_blocks", material[0] + ":" + material[1] + "_block")
  }


  const mc_nuggets = ["iron", "gold", "copper"]
  const tc_nuggets =  ["cobalt", "slimesteel", "amethyst_bronze", "rose_gold", "pig_iron", "manyullyn", "hepatizon", "queens_slime", "netherite"]

  for (const nugget of mc_nuggets) {
    event.add("c:nuggets/" + nugget, "minecraft:" + nugget + "_nugget")
  }
  for (const nugget of tc_nuggets) {
    event.add("c:nuggets/" + nugget, "tconstruct:" + nugget + "_nugget")
  }
})
