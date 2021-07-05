package com.example.covidsurvey;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    final Calendar myCalendar = Calendar.getInstance();
    RadioGroup rg;
    Spinner selectedCitySpinner;
    Spinner selectedVaccineSpinner;
    EditText nameText;
    EditText surnameText;
    Button sendButton;
    EditText sideEffect;
    String gender;
    String vaccine;
    String city;
    CharSequence resultText = "";
    boolean setCalendar = false;

    public void checkAllFilled(){
        if( setCalendar &&
            nameText.getText().toString().trim().length() != 0 &&
            surnameText.getText().toString().trim().length() != 0 &&
            city != null &&
            gender != null &&
            vaccine != null){
            sendButton.setAlpha(1);
        }else{
            sendButton.setAlpha(0);
        }
    }


    DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int monthOfYear,
                              int dayOfMonth) {
            // TODO Auto-generated method stub
            setCalendar = true;
            checkAllFilled();
            myCalendar.set(Calendar.YEAR, year);
            myCalendar.set(Calendar.MONTH, monthOfYear);
            myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
            LocalDate birthday = LocalDateTime.ofInstant(myCalendar.toInstant(), myCalendar.getTimeZone().toZoneId()).toLocalDate();
            ((TextView)findViewById(R.id.birthdateText)).setText(birthday.toString());
        }
    };

    private final TextWatcher watcher = new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after)
        { }
        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count)
        {}
        @Override
        public void afterTextChanged(Editable s) {
            checkAllFilled();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        rg = findViewById(R.id.genderGroup);
        selectedCitySpinner = findViewById(R.id.selectedCity);
        selectedVaccineSpinner = findViewById(R.id.selectedVaccine);
        nameText = findViewById(R.id.nameText);
        surnameText = findViewById(R.id.surnameText);
        sideEffect = findViewById(R.id.sideText);
        sendButton = findViewById(R.id.sendButton);
        sendButton.setAlpha(0);
        nameText.addTextChangedListener(watcher);
        surnameText.addTextChangedListener(watcher);
        selectedVaccineSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                // your code here
                if(position != 0)
                    vaccine = getResources().getStringArray(R.array.Vaccines)[position];
                checkAllFilled();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });
        selectedCitySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                // your code here
                if(position != 0)
                    city = getResources().getStringArray(R.array.Cities)[position];
                checkAllFilled();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parentView) {
                // your code here
            }

        });
        rg.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener()
        {
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                switch(checkedId){
                    case R.id.maleButton:
                        // do operations specific to this selection
                        gender = "Male";
                        break;
                    case R.id.femaleButton:
                        // do operations specific to this selection
                        gender = "Female";
                        break;
                    case R.id.otherButton:
                        // do operations specific to this selection
                        gender = "Other";
                        break;
                }
                checkAllFilled();
            }
        });
    }

    public void selectBirthdate(View view){
        new DatePickerDialog(this, date, myCalendar
                .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                myCalendar.get(Calendar.DAY_OF_MONTH)).show();
        checkAllFilled();
    }

    public void sendSurvey(View view){
        String mydate = java.text.DateFormat.getDateTimeInstance().format(myCalendar.getInstance().getTime());
        System.out.println(nameText.getText());
        System.out.println(surnameText.getText());
        System.out.println(mydate);
        System.out.println(city);
        System.out.println(gender);
        System.out.println(vaccine);
        System.out.println(sideEffect.getText());
        Context context = getApplicationContext();
        int duration = Toast.LENGTH_SHORT;
        checkAndSetMessage();
        Toast toast = Toast.makeText(context, resultText, duration);
        toast.show();
        LocalDate birthday = LocalDateTime.ofInstant(myCalendar.toInstant(), myCalendar.getTimeZone().toZoneId()).toLocalDate();

        String resultData = "Name: " + nameText.getText() + "\n"
                            +"Surname: " + surnameText.getText() + "\n"
                            +"Birthdate: " + birthday.toString() + "\n"
                            +"City: " + city + "\n"
                            +"Gender: " + gender + "\n"
                            +"Vaccine: " + vaccine + "\n"
                            +"Side effect: " + sideEffect.getText() + "\n"
                ;

        new AlertDialog.Builder(MainActivity.this)
                .setTitle("Result")
                .setMessage(resultData)

                // Specifying a listener allows you to take an action before dismissing the dialog.
                // The dialog is automatically dismissed when a dialog button is clicked.
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        // Continue with delete operation
                    }
                })

                // A null listener allows the button to dismiss the dialog and take no further action.
                .setNegativeButton(android.R.string.no, null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }

    public void checkAndSetMessage(){
        LocalDate birthday = LocalDateTime.ofInstant(myCalendar.toInstant(), myCalendar.getTimeZone().toZoneId()).toLocalDate();
        LocalDate currentDate = LocalDate.now();
        long age = ChronoUnit.YEARS.between(birthday, currentDate);
        System.out.println("BIRTHDATE: " + birthday.toString());
        System.out.println("TODAY: " + currentDate.toString());
        System.out.println("AGE: " + age);
        if(age < 0) {
            resultText = "Please enter correct birthdate.";
        }else if(age < 18){
            resultText = "You need to be older than 18 years old.";
        }else if(age > 200) {
            resultText = "Please check your birthdate.";
        }else{
            if(sideEffect.getText().length() > 200){
                resultText = "You cannot enter more than 200 character as a side effect.";
            }else{
                System.out.println("Lenght:" + sideEffect.getText().length());
                resultText = "You successfully sent your survey, thank you " + nameText.getText();
            }
        }
    }
}