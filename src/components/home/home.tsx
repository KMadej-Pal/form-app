import useFetch from "../../hooks/useFetch";
import { useFormHook } from "../../hooks/useFormHook";
import InputCalendar from "../calendarInput/calendarInput";
import { Input } from "../input/input";
import { InputFile } from "../inputFile/inputFile";
import RangeInput from "../rangeInput/rangeInput";

export const Home = () =>{
    const [formData,errors,touched, {onChange,onBlur}] = useFormHook({ name: '', surname:'', email: '', age:8, photo:'', workoutDate: '' })
    const minAgeFormValue = 8;
    const maxAgeFormValue = 100;
    const API_KEY = '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx';


  const { data: holidays, loading, error } = useFetch(
    "https://api.api-ninjas.com/v1/holidays?country=PL&year=2024",
    API_KEY
  );


  const handleSubmit = (e:any) => {
    e.preventDefault(); 
  };

  const sendApp = async() => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("surname", formData.surname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("age", formData.age.toString());
    formDataToSend.append("workoutDate", formData.workoutDate);
    formDataToSend.append("photo", formData.photo); 

    try {
      const response = await fetch("http://letsworkout.pl/submit", {
        method: "POST",
        body: formDataToSend, 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  
    return (
        <form className="sm:w-[426px] w-full p-8 sm:px-0 flex flex-col gap-7" onSubmit={handleSubmit}>
            <div className="text-custom-text text-2xl font-medium">Personal info</div>
            <Input
              value={formData.name}
              label={'First name'}
              onChange={(e) => onChange('name',e.target.value)}
              onBlur={() => onBlur('name')}
              touched={touched.name}
              errors={errors.name}
            />

            <Input
              value={formData.surname}
              label={'Last name'}
              onChange={(e) => onChange('surname',e.target.value)}
              onBlur={() => onBlur('surname')}
              touched={touched.surname}
              errors={errors.surname}
            />

            <Input
              value={formData.email}
              label={'Email address'}
              onChange={(e) => onChange('email',e.target.value)}
              onBlur={() => onBlur('email')}
              touched={touched.email}
              errors={errors.email}
            />

            <div className="flex flex-col">
                <span>Age</span>
                <div className="text-xs text-custom-text flex justify-between mt-1">
                    <span>{minAgeFormValue}</span>
                    <span>{maxAgeFormValue}</span>
                </div>
                <RangeInput
                  minAgeFormValue={minAgeFormValue}
                  maxAgeFormValue={maxAgeFormValue}
                  value={formData.age}
                  onChange={(e) => onChange('age',e.target.value)}
                />
             </div>
           

             <div className="flex flex-col">
                <InputFile
                   value={formData.photo}
                   label={'Photo'}
                   onChange={(e) => e.target.files ?  onChange('photo',e.target.files[0]) :  onChange('photo',null)}
                   onBlur={() => onBlur('photo')}
                   touched={touched.photo}
                   errors={errors.photo}
                />
             </div>
             <div className="text-custom-text text-2xl font-medium">Your workout</div>
            <InputCalendar holidays={holidays}  onChange={(e) => onChange('workoutDate',e)}/>

            <button  className="bg-custom-button-main text-white text-lg px-4 py-2 rounded font-medium disabled:bg-custom-lilic" disabled={Object.keys(errors).length !== 0} onClick={sendApp}>
                Send Application
            </button>
        </form>
    )
}










