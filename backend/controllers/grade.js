const calculateGrade = async (req, res) => {
    const score = Number(req.query.score);
    if (score > 100 || score < 0) {
        res.status(400).send({ message: "score cannot be more then 100 or less than 0." });
    } else if (score >= 80) {
        res.status(200).send({ grade: "A", message: "Grade analyzed" });
    } else if (score >= 70) {
        res.status(200).send({ grade: "B", message: "Grade analyzed" });
    } else if (score >= 60) {
        res.status(200).send({ grade: "C", message: "Grade analyzed" });
    } else if (score >= 50) {
        res.status(200).send({ grade: "D", message: "Grade analyzed" });
    } else {
        res.status(200).send({ grade: "F", message: "Grade analyzed" });
    }
};

module.exports = {
    calculateGrade
};