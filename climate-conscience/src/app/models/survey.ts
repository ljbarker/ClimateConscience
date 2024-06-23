import mongoose, { Schema } from 'mongoose';

export type Survey = {
    usernameDate: string;
    questions: string[];
    answers: string[];
}

const SurveySchema = new Schema<Survey>({
    usernameDate: { type: String, required: true },
    questions: {
        type: [String], required: true, default: [
            "How many people live in your house?",
            "What is the primary heat source for your home?",
            "How many vehicles are in your household?",
            "Do you get regular maintainence on those vehicles",
            "How much natural gas do you use?",
            "How much electricity do you use?",
            "Do you use green power?",
            "What percentage of your power is green?",
            "How much fuel oil do you use?",
            "How much propane do you use?",
            "Do you recycel Aluminum or Steel?",
            "Do you recycle Plastic?",
            "Do you recycle Glass?",
            "Do you recycle Newspaper?",
            "Do you recycle Magazines?",
        ]
    },
    answers: { type: [String], required: true },
});

const SurveyModel = mongoose.models["Survey"] || mongoose.model('Survey', SurveySchema);

export default SurveyModel;