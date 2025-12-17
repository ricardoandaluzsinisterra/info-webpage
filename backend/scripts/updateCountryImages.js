const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const Country = require("../models/Country");

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✓ Connected to MongoDB");

    const filePath = path.resolve(__dirname, "../../collections/countries.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const countries = JSON.parse(raw);

    for (const c of countries) {
      const name = c.name && c.name.trim();
      if (!name) continue;

      try {
        const countryDoc = await Country.findOne({ name: new RegExp(name, "i") });
        if (!countryDoc) {
          console.log(`❌ Not found in DB: ${name}`);
          continue;
        }

        countryDoc.imageUrl = c.imageUrl || null;
        countryDoc.updatedAt = new Date();
        await countryDoc.save();

        console.log(`✓ Updated: ${countryDoc.name} -> ${countryDoc.imageUrl}`);
      } catch (err) {
        console.error(`❌ Error updating "${name}":`, err.message || err);
      }
    }

    console.log("✓ All updates processed");
    await mongoose.disconnect();
    console.log("✓ Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection or script error:", err.message || err);
    process.exit(1);
  }
}

main();
