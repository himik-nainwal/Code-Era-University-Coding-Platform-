const mongoose =require("mongoose");
const code_schema = new mongoose.Schema(
    {
        ques_id:{
            type: Number,
            required: true,
            unique:true,
        },
        
        cpp_boilerplate:{
            type: String,
        },
        
        correct_code:{
            type: String,
            // required: true,
        },

        custom_judge:{
            type: String,
        },
        example_test_case_input:{
            type:String,

        },
        example_test_case_output:{
            type:String,
        },
        all_test_cases_input:{
            type:String,
        },
        all_test_cases_output:{
            type:String,
        },
    },
    {
        timestamps:true,
    },
    {
        collection: "codes",
    }
);
module.exports = mongoose.model("codes",code_schema);