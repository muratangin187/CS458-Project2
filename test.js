const wd = require("wd");
let driver ;

const caps = {
    platformName: "Android",
    platformVersion: "11",
    deviceName: "Android Emulator",
    app: "/Users/muratangin/Documents/COURSES/2021summer/CS458/project2/covid_survey.apk",
    appPackage: "com.example.covidsurvey",
    appActivity: ".MainActivity",
    automationName: "UiAutomator2"
}

const serverConfig = {
    host: 'localhost',
    port: 4723
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function click(id){
    const nameText = await driver.elementById(id);
    await nameText.click();
}

async function setName(name){
    const nameText = await driver.elementById('nameText');
    await nameText.sendKeys(name);
    await sleep(500);
}

async function getName(){
    const nameText = await driver.elementById('nameText');
    return nameText.text();
}

async function setSurname(surname){
    const surnameText = await driver.elementById('surnameText');
    await surnameText.sendKeys(surname);
    await sleep(500);
}

async function getSurname(){
    const surnameText = await driver.elementById('surnameText');
    return await surnameText.text();
}

async function setDate(type){
    await click('pickDateButton');
    await sleep(1000)
    const startPercentage = 50;
    const endPercentage = 100;
    const anchorPercentage = 50;

    const { width, height } = await driver.getWindowSize();
    const anchor = width * anchorPercentage / 100;
    const startPoint = height * startPercentage / 100;
    const endPoint = height * endPercentage / 100;
    if(type == 1){ // set age more than 18
        await click('android:id/date_picker_header_year');
        let action = new wd.TouchAction(driver);
        action.press({
                    x: anchor,
                    y: startPoint
                });
        action.wait({ms: 10});
        action.moveTo({
                    x: anchor,
                    y:endPoint 
                });
        action.wait({ms: 10});
        action.release();
        await action.perform();
        await action.perform();
        await action.perform();
        await action.perform();
        const list = await driver.elementsById("android:id/text1");
        await list[1].click();

    }else if(type == 2){ // set age less than 18
        await click('android:id/date_picker_header_year');
        let action = new wd.TouchAction(driver);
        action.press({
                    x: anchor,
                    y: startPoint
                });
        action.wait({ms: 10});
        action.moveTo({
                    x: anchor,
                    y:endPoint 
                });
        action.wait({ms: 10});
        action.release();
        await action.perform();
        const list = await driver.elementsById("android:id/text1");
        await list[1].click();

    }else{ // set age negative
        await click('android:id/date_picker_header_year');
        let action = new wd.TouchAction(driver);
        action.press({
                    x: anchor,
                    y: startPoint
                });
        action.wait({ms: 10});
        action.moveTo({
                    x: anchor,
                    y: height-endPoint 
                });
        action.wait({ms: 10});
        action.release();
        await action.perform();
        await action.perform();
        const list = await driver.elementsById("android:id/text1");
        await list[1].click();
    }
    await sleep(500);
    await click("android:id/button1");
    await sleep(500);
}

async function getDate(){
    const date = await driver.elementById('com.example.covidsurvey:id/birthdateText');
    return date.text();
}

async function setCity(){
    await click("com.example.covidsurvey:id/selectedCity");
    await sleep(1000);
    const list = await driver.elementsById("android:id/text1");
    await list[2].click();
    await sleep(500);
}

async function getCity(){
    return (await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.ScrollView/android.view.ViewGroup/android.widget.Spinner[1]/android.widget.TextView")).text();
}

async function setGender(type){
    if(type == 0){
        await click("com.example.covidsurvey:id/maleButton");
    }else if(type == 1){
        await click("com.example.covidsurvey:id/femaleButton");
    }else{
        await click("com.example.covidsurvey:id/otherButton");
    }
    await sleep(500);
}

async function getGender(){
    let maleButton = await driver.elementById("com.example.covidsurvey:id/maleButton");
    let femaleButton = await driver.elementById("com.example.covidsurvey:id/femaleButton");
    let otherButton = await driver.elementById("com.example.covidsurvey:id/otherButton");
    if(await maleButton.getAttribute("checked")){
        return 0;
    }else if(await femaleButton.getAttribute("checked")){
        return 1;
    }else if(await otherButton.getAttribute("checked")){
        return 2;
    }else{
        return -1;
    }
}

async function setVaccine(){
    await click("com.example.covidsurvey:id/selectedVaccine");
    await sleep(1000);
    const list = await driver.elementsById("android:id/text1");
    await list[2].click();
    await sleep(500);
}

async function getVaccine(){
    return (await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.widget.ScrollView/android.view.ViewGroup/android.widget.Spinner[2]/android.widget.TextView")).text();
}

async function setSideEffect(sideEffect){
    const sideEffectText = await driver.elementById('com.example.covidsurvey:id/sideText');
    await sideEffectText.sendKeys(sideEffect);
    await sleep(500);
}

async function getSideEffect(){
    const sideEffectText = await driver.elementById('com.example.covidsurvey:id/sideText');
    return sideEffectText.text();
}

async function sendSurvey(){
    await click("sendButton");
    await sleep(500);
    await click("android:id/button1");
}

async function isButtonVisible(){
    try{
        let element = await driver.elementById("sendButton");
        return await element.isDisplayed();
    }catch(err){
        return false;
    }
}


async function testCaseOne(){
    let buttonVisible = await isButtonVisible();
    if(!buttonVisible){
        console.log("#1 - Test successful");
    }else{
        console.log("#1 - Test failed");
    }
    await setName("Murat");
    await setSurname("Angin");
    await setDate(2);
    await setCity();
    await setGender(2);
    await setVaccine();
    await setSideEffect("bas agrisi");
    buttonVisible = await isButtonVisible();
    if(buttonVisible){
        console.log("#2 - Test successful");
    }else{
        console.log("#2 - Test failed");
    }
    await setSurname("");
    buttonVisible = await isButtonVisible();
    if(!buttonVisible){
        console.log("#3 - Test successful");
    }else{
        console.log("#3 - Test failed");
    }
    await setSurname("Angin");
}

async function testCaseTwo(){
    let futureText = "Please enter correct birthdate.";
    let youngText = "You need to be older than 18 years old.";
    let successText = "You successfully sent your survey, thank you Murat";
    await sendSurvey();
    await sleep(1000);
    let toast = await driver.elementByXPath("//android.widget.Toast[1]");
    let currentToast = await toast.text();
    if(currentToast == youngText){
        console.log("#4 - Test successful");
    }else{
        console.log("#4 - Test failed");
    }
    await setDate(0);
    await sendSurvey();
    await sleep(1000);
    toast = await driver.elementByXPath("//android.widget.Toast[1]");
    currentToast = await toast.text();
    if(currentToast == futureText){
        console.log("#5 - Test successful");
    }else{
        console.log(currentToast)
        console.log("#5 - Test failed");
    }
    await setDate(1);
    await sendSurvey();
    await sleep(1000);
    toast = await driver.elementByXPath("//android.widget.Toast[1]");
    currentToast = await toast.text();
    if(currentToast == successText){
        console.log("#6 - Test successful");
    }else{
        console.log("#6 - Test failed");
    }
}

async function testCaseThree(){
    await setGender(0);
    await setGender(1);
    await setGender(2);
    await setGender(1);
    await setGender(2);
    await setGender(0);
    if(await getGender() == 0){
        console.log("#7 - Test successful");
    }else{
        console.log("#7 - Test failed");
    }
}

async function testCaseFour(){
    let sideEffect = getSideEffect();
    let longText = "You cannot enter more than 200 character as a side effect.";
    let successText = "You successfully sent your survey, thank you Murat";
    await sendSurvey();
    await sleep(1000);
    toast = await driver.elementByXPath("//android.widget.Toast[1]");
    currentToast = await toast.text();
    if(currentToast == successText){
        console.log("#8 - Test successful");
    }else{
        console.log(currentToast)
        console.log("#8 - Test failed");
    }
    await setSideEffect("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis leo quis ultricies tincidunt. Phasellus mauris lacus, placerat non nisi quis, auctor commodo eros. Ut lobortis mi a rhoncus vehicula. Aliquam erat volutpat.");
    await sendSurvey();
    await sleep(1000);
    toast = await driver.elementByXPath("//android.widget.Toast[1]");
    currentToast = await toast.text();
    if(currentToast == longText){
        console.log("#9 - Test successful");
    }else{
        console.log(currentToast)
        console.log("#9 - Test failed");
    }
}

async function testCaseFive(){
    await setName("Murat");
    await setSurname("Angin");
    await setDate(2);
    await setCity();
    await setGender(2);
    await setVaccine();
    await setSideEffect("bas agrisi");
    let name = await getName();
    let surname = await getSurname();
    let date = await getDate();
    let city = await getCity();
    let vaccine = await getVaccine();
    let gender = "Other";
    let sideEffect = await getSideEffect();
    await click("sendButton");
    await sleep(500);
    let result = await driver.elementById("android:id/message");
    if((await result.text()) == "Name: "+name+"\nSurname: "+surname+"\nBirthdate: "+date+"\nCity: "+city+"\nGender: "+gender+"\nVaccine: "+vaccine+"\nSide effect: " + sideEffect + "\n"){
        console.log("#10 - Test successful");
    }else{
        console.log("#10 - Test failed");
    }
}

async function main () {
    driver = await wd.promiseChainRemote(serverConfig);
    await driver.init(caps);
    await sleep(1000);
    await testCaseOne();

    await testCaseTwo();

    await testCaseThree();

    await testCaseFour();

    await testCaseFive();

    await sleep(10000000);
}
main();
