const mongoose = require('mongoose');
const Country = require('../models/Country');
const Achievement = require('../models/Achievement');
require('dotenv').config();

const lassoBasedAchievements = [
  {
    title: "Afro-Panamanian Commercial & Republican Tradition (16th-19th centuries)",
    countryName: "Panama - Democratic Movements & Freedom",
    year: 1600,
    category: "Governance",
    description: "Centuries before the Panama Canal, Afro-descended boatmen, peasants, and merchants built sophisticated commercial networks along the Chagres River, creating vibrant towns with republican traditions. These communities established democratic municipalities with Black mayors and universal male citizenship rights, demonstrating that Black political participation and democratic governance flourished in Panama long before similar developments in Europe or North America. This history was systematically erased by U.S. Canal Zone authorities who portrayed the region as 'jungle' rather than acknowledging its centuries of civilization.",
    globalImpact: "Demonstrated that multiracial democracy and Black political leadership were viable and successful before European/U.S. models",
    innovators: ["Afro-Panamanian boatmen", "Black municipal leaders", "Republican citizens of Canal Zone towns"],
    legacy: "Foundation of Panama's democratic tradition; proved that tropical regions had sophisticated governance systems that predated U.S. intervention"
  },
  {
    title: "Black Mayors' Democratic Leadership in Canal Zone Municipalities (1850s-1904)",
    countryName: "Panama - Democratic Movements & Freedom",
    year: 1880,
    category: "Governance",
    description: "In the municipalities that would become the Canal Zone—including Gatún, Gorgona, and Chagres—Black mayors and elected officials governed prosperous commercial towns with diverse populations. These leaders managed complex urban centers, trade networks, and civic institutions, directly contradicting U.S. narratives that portrayed the region as primitive. When the U.S. took control, these municipalities were systematically eliminated not for engineering reasons, but to remove evidence of successful Afro-Panamanian democratic governance that challenged racist assumptions about Black political capacity.",
    globalImpact: "Provided concrete examples of Black democratic leadership that undermined scientific racism's claims",
    innovators: ["Black mayors of Canal Zone towns", "Afro-Panamanian elected officials", "Municipal leaders"],
    legacy: "Their removal demonstrates how imperial powers erase evidence of colonized peoples' political sophistication"
  },
  {
    title: "Panamanian Intellectual Resistance to Forced Depopulation (1908-1914)",
    countryName: "Panama - Democratic Movements & Freedom",
    year: 1910,
    category: "Culture",
    description: "As the U.S. Canal Zone authorities forcibly removed 40,000 Panamanians from 41 historic towns, Panamanian intellectuals, journalists, and community leaders wrote powerful protests and legal arguments challenging this displacement. In letters documented by historian Marixa Lasso, residents of towns like Gatún wrote heartbreaking appeals: 'We the people of New Gatún have been the most tormented by Canal necessity...we were told we would not be disturbed again.' These essays and petitions exposed that depopulation was driven by racism, not engineering necessity, as U.S. authorities debated 'what kind of people they wanted in the Zone' with 'nothing about technology' in their deliberations.",
    globalImpact: "Documented how imperial powers use 'modernization' rhetoric to mask racist displacement policies",
    innovators: ["Panamanian community leaders", "Displaced residents of Gatún, Gorgona, Chagres", "Anti-displacement writers"],
    legacy: "Established literary tradition of resistance to imperial erasure; inspired modern anti-displacement movements"
  },
  {
    title: "Carlos Mendoza - Afro-Panamanian Presidential Leadership (1910)",
    countryName: "Panama - Democratic Movements & Freedom",
    year: 1910,
    category: "Governance",
    description: "Carlos Mendoza, an Afro-Panamanian, became president of Panama in 1910—'100 years before Obama'—demonstrating that multiracial democracy and Black executive leadership were realities in Latin America long before North America. However, U.S. authorities intervened, stating 'no you cannot have this person as a president,' revealing that American control over Panama extended beyond the Canal Zone to dictating who could lead the sovereign republic. This episode exposed how U.S. imperialism actively suppressed democratic outcomes that challenged white supremacist assumptions.",
    globalImpact: "Demonstrated that Black executive leadership was achievable and accepted in early 20th century Latin America",
    innovators: ["Carlos Mendoza", "Liberal Party of Panama", "Afro-Panamanian political leaders"],
    legacy: "Symbol of how imperialism disrupts democratic processes; inspiration for Pan-American Black political movements"
  },
  {
    title: "Reclamation of Erased History - Modern Anti-Racist Scholarship (2019-Present)",
    countryName: "Panama - Democratic Movements & Freedom",
    year: 2019,
    category: "Culture",
    description: "Dr. Marixa Lasso's groundbreaking book 'Erased: The Untold Story of the Panama Canal' (2019) recovered the deliberately suppressed history of the 40,000 Panamanians displaced and the 41 towns destroyed to create the Canal Zone. Through meticulous archival research, Lasso revealed that the depopulation was driven entirely by racism—debates among U.S. officials centered on 'what kind of people they wanted in the Zone' with 'nothing about technology.' Her work empowered Panamanians by providing 'a different version of their own history,' challenging triumphalist U.S. narratives that portrayed the Canal as bringing 'modernity to the jungle' while erasing Panama's centuries of commercial sophistication and democratic governance.",
    globalImpact: "Won the Friedrich Katz Prize (2020); transformed how the Panama Canal is understood globally; inspired digital reconstructions of lost towns",
    innovators: ["Dr. Marixa Lasso", "Panamanian historians", "Anti-colonial scholars"],
    legacy: "Model for recovering erased histories of imperial displacement; now taught in schools and displayed in Panama Canal Museum"
  }
];

async function addLassoAchievements() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find Panama country
    const panama = await Country.findOne({ name: /Panama/i });
    if (!panama) {
      console.error('❌ Panama country not found in database!');
      process.exit(1);
    }
    console.log(`✓ Found Panama: ${panama.name}`);

    // Add country reference to achievements
    const achievementsToInsert = lassoBasedAchievements.map(ach => ({
      ...ach,
      country: panama._id,
      countryName: undefined // Remove helper field
    }));

    // Insert achievements
    const inserted = await Achievement.insertMany(achievementsToInsert);
    console.log(`✓ Inserted ${inserted.length} new achievements based on Lasso's "Erased"`);

    // Update Panama country document to reference these achievements
    await Country.findByIdAndUpdate(
      panama._id,
      { $push: { achievements: { $each: inserted.map(a => a._id) } } }
    );
    console.log('✓ Updated Panama country with new achievement references');

    console.log('\n🎉 SUCCESS! Panama now includes anti-racist intellectual tradition from "Erased"');
    console.log('\nAdded achievements:');
    inserted.forEach((ach, i) => {
      console.log(`  ${i + 1}. ${ach.title} (${ach.year})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding achievements:', error);
    process.exit(1);
  }
}

addLassoAchievements();
