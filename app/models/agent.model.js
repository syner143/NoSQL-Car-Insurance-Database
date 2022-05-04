module.exports = mongoose => {
    const Agent = mongoose.model(
        "agent",
        mongoose.Schema(
            {
                AgentID: Number,
                Forename: String,
                Surname: String,
                Username: String,
                Phone: String
            },
            { timestamps: true}
        )
    );

    return Agent;
};