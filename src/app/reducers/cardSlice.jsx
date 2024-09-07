import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardData:[
      {
        select: "",
        writeHere: ""
      },
      {
        writeHere: "",
        check: false
      },
      {
        select: "",
        writeHere: ""
      },
      {
        name: "",
        email: "",
        phone: "",
        writeHere: "",
      }
    ]
}

export const cardSlice = createSlice({
    name: 'cardData',
    initialState,
    reducers: {
        setIssue: (state, action) => {
            state.cardData[0].select = action.payload.select;
            state.cardData[0].writeHere = action.payload.writeHere;
        },
        setFeedback: (state, action) => {
            state.cardData[1].writeHere = action.payload.writeHere;
        },
        setSuggestion: (state, action) => {
            state.cardData[2].select = action.payload.select;
            state.cardData[2].writeHere = action.payload.writeHere;
        },
        setContact: (state, action) => {
            state.cardData[3].name = action.payload.name;
            if(action.payload.email !== "" && action.payload.phone !== ""){
                state.cardData[3].email = action.payload.email;
                state.cardData[3].phone = action.payload.phone;
            }
            state.cardData[3].writeHere = action.payload.writeHere; 
        },
        clearData: (state) => {
            state.cardData = [
              {
                select: "Select",
                writeHere: ""
              },
              {
                writeHere: "",
                check: false
              },
              {
                select: "Select",
                writeHere: ""
              },
              {
                name: "",
                email: "",
                phone: "",
                writeHere: "",
              }
            ]
        }
    }
})

export const { setIssue, setFeedback, setSuggestion, setContact, clearData } = cardSlice.actions

export default cardSlice.reducer