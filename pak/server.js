const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// تمكين CORS
app.use(cors());

// مسار لجلب بيانات البوكيمون
app.get('/api/pokemon', async (req, res) => {
    const pokemonId = req.query.id; // الحصول على المعرف من الطلب

    if (!pokemonId) {
        return res.status(400).json({ error: "Pokemon ID is required" });
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
        const response = await axios.get(apiUrl); // جلب البيانات من API
        const data = response.data;

        // تجهيز البيانات لإرسالها إلى الواجهة الأمامية
        const result = {
            id: data.id,
            name: data.name,
            type: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            base_experience: data.base_experience,
            height: data.height,
            weight: data.weight,
            sprite_url_front: data.sprites.front_default,
            sprite_url_back: data.sprites.back_default
        };

        res.json(result); // إرسال البيانات كاستجابة
    } catch (error) {
        res.status(404).json({ error: "Pokemon not found" });
    }
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
