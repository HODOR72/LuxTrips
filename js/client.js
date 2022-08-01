document.addEventListener("DOMContentLoaded", () => {
    clientRemove()
    formUnlock()
    creditCard()
    cardDataCollection()
});

function formUnlock() {
	// Get inputs and buttons
	const formInputs = document.querySelectorAll('.client__signature-edit')
	const formEdit = document.querySelectorAll('.client-link-edit')

	// Active block painting
    document.querySelectorAll('.client__info_block').forEach(block => block.onclick = () => {
        document.querySelector('.client__info-active').classList.remove('client__info-active');
        block.classList.add('client__info-active');
        }
    )

	// Run functions when inputs || buttons are clicked
	formInputs.forEach(item => item.addEventListener('click', unlockInp));
	formEdit.forEach(item => item.addEventListener('click', unlockInpWithBtn));

	// Setting Styles for the Active Login
	let activeInp = ''
	function unlockInp() {
		if (activeInp !== '') {
			activeInp.setAttribute('readonly', 'readonly');
			activeInp.classList.remove('client__signature-active');
			activeInp = this;
		} else {
			activeInp = this;
		}
		this.removeAttribute('readonly');
		this.classList.add('client__signature-active');
	}
    // Getting a neighbor input on the click of a button
	function unlockInpWithBtn() {
		unlockInp.call(this.previousElementSibling);
	}
};

const blocksInfo =  document.querySelectorAll(".client__blocks-info");
function showNameFile(uploadedFile) {
    const files = uploadedFile.files;
    for(let i=0; i < files.length; i++){
        blocksInfo.forEach(element => {
            const blockInfo = document.createElement("div");
            blockInfo.classList.add("client__block-documents");

            const blockIntro = document.createElement("p");
            blockIntro.classList.add("client__block-intro");
            blockIntro.textContent = files[i].name;

            const blockEdit = document.createElement("p");
            blockEdit.textContent = "Remove";
            blockEdit.classList.add("client__block-edit");
            blockEdit.classList.add("client__block-remove");

            blockInfo.append(blockIntro);
            blockInfo.append(blockEdit);
            element.append(blockInfo);
        });
    }
    clientRemove();
};
function clientRemove() {
    document.querySelectorAll(".client__block-remove").forEach(block => block.onclick = () =>{
        block.parentNode.remove();
    })
};
function creditCard(){
    function closeCard(event) {
        if (!event.target.closest('#clientCard')) {
            clientCard.classList.remove("client__credit-active");
            document.body.removeEventListener('click', closeCard);
        }
    }
    document.querySelectorAll(".client__block-add").forEach(block => block.onclick = (event) =>{
        clientCard.classList.toggle("client__credit-active");
        event.stopPropagation();
        document.body.addEventListener('click', closeCard);
    })
    const cardsCredit = document.querySelector(".client__cards-credit");
    cardsCredit.addEventListener("click", function() {
        cardsCredit.classList.toggle("client-rotate");
    })
};

function cardDataCollection() {
    const inpCardnum = document.querySelector("#clientInputCardnum");
    const showCardnum = document.querySelector("#clientShowCardnum");
    const inpName = document.querySelector("#clientInputName");
    const showName = document.querySelector("#clientShowName");
    const showNameBack = document.querySelector("#clientShowNameBack");
    const inpDate = document.querySelector("#clientInputDate");
    const showDate = document.querySelector("#clientShowDate");
    const showCvc = document.querySelector("#clientShowCvc");
    const inpCvc = document.querySelector("#clientInputCvc");
    const cardBackground = document.querySelector("#cardfront");
    const cardsCredit = document.querySelector(".client__cards-credit");
    const clientCardLogo = document.querySelector(".client__card-logo");
    const clientInpLogo = document.querySelector(".client__card-logo-inp");
    const cardBackBackground = document.querySelector(".client-back");
    const cardForm = document.querySelector(".client__card-form");
    const cardBtn = document.querySelector(".client__card-btn");
    const paymentsBlock = document.querySelectorAll(".client__payments");
    let fillingForm = [];
   
    inpCardnum.addEventListener("input", function() {
        validateNum(inpCardnum, showCardnum);
        cardStyle(identifyBank(inpCardnum.value));
        if(this.value.length === 19){
            fillingForm[0] = "Yes";
        }else{
            fillingForm[0] = "No";
        }
        if(identifyBank(inpCardnum.value) !== undefined){
            fillingForm[1] = "Yes";
        }else{
            fillingForm[1] = "No";
        }        
    });
    inpName.addEventListener("input", function() {
        validateStr(inpName, showName, showNameBack);
        if(this.value.trim().length >= 3){
            return fillingForm[2] = "Yes";
        }
        fillingForm[2] = "No";
    });
    inpDate.addEventListener("input", function() {
        validateDate(inpDate, showDate);
        if(this.value.length === 5){
            return fillingForm[3] = "Yes";
        }
        fillingForm[3] = "No";
    });
    inpCvc.addEventListener("input", function() {
        validateCvc(inpCvc, showCvc);
        if(this.value.length >= 3){
            return fillingForm[4] = "Yes";
        }
        fillingForm[4] = "No";
    });

    cardForm.addEventListener("input", function() {
        if(fillingForm[0] == "Yes" && fillingForm[1] == "Yes" && fillingForm[2] == "Yes" && fillingForm[3] == "Yes" && fillingForm[4] == "Yes"){ 
            cardBtn.classList.add("active-btn");
        }else{
            cardBtn.classList.remove("active-btn");
        }
    });
    function validateStr(inp, show, showBack) {
        show.textContent = inp.value = inp.value.replace (/[^a-z\sA-Z]/g,'' );
        showBack.textContent = inp.value = inp.value.replace (/[^a-z\sA-Z]/g,'' );
            if(show.textContent.trim().length == 0){
                show.textContent = "JONH DOE";
                showBack.textContent = "JOHN DOE";
            }
    };
    inpCardnum.addEventListener('keypress', function (evt) {
        if (evt.keyCode < 48 || evt.keyCode > 57) evt.preventDefault();
    });
    function validateNum(inp, show) {
        value = inp.value.replace(/(\d{4})(?!\s|$)/gm, `$1 `);
        show.textContent = inp.value = value.match(/(?:\d{0,4} ?){0,3}(?:\d{0,4})?/);
         if(show.textContent.trim().length == 0){
            show.textContent = '0123 4567 8910 1112';
        }
    };
    function validateDate(inp, show){
        let inpValid = inp.value.split("");
        switch (inpValid[0]){
            case "0":{
                if ( !parseInt(inpValid[1]) ) {
                    inp.value = inp.value.substring(0, 1);
                } 
                break;
            }
            case "1":{
                if(inpValid[1] > 2 || inpValid[1] % 1 !== 0){
                    inp.value = inp.value.substring(0, 1);
                }
                break;
            }
            default:{
                inp.value = inp.value.substring(0, 0);
            }
        }
        if(inpValid[2] !== "/" && inpValid[2] !== undefined){
            inp.value = inp.value.substring(0, 2);
        }
        if(inpValid[3] % 1 !== 0 && inpValid[3] !== undefined){
            inp.value = inp.value.substring(0, 3);
        }
        if(inpValid[4] % 1 !== 0 && inpValid[4] !== undefined){
            inp.value = inp.value.substring(0, 4);
        }
        show.textContent = inp.value.replace();
        if(show.textContent.length == 0){
            show.textContent = '01/23';
        }
    };
    function validateCvc(inp, show){
        show.textContent = inp.value = inp.value.replace (/\D/g, '');
        if(show.textContent.length == 0){
            show.textContent = "985";
        }
    };
    inpName.addEventListener("focus", function() {
        cardsCredit.classList.remove("client-rotate");
    })
    inpCardnum.addEventListener("focus", function() {
        cardsCredit.classList.remove("client-rotate");
    })
    inpDate.addEventListener("focus", function() {
        cardsCredit.classList.remove("client-rotate");
    })
    inpCvc.addEventListener("focus", function() {
        cardsCredit.classList.add("client-rotate");
    })

    function identifyBank(cardNumber){
        if(cardNumber.match("^4") !== null){
            return "visa";
        }
        if (cardNumber.match("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)") != null){
            return "discover";
        }
        if(cardNumber.match("^3[47]\\d{0,13}") !== null){
            return "american express";
        }
        if(cardNumber.match("^3[15]") !== null){
            return "jcb";
        }
        if(cardNumber.match("^2") !== null){
            return "mir";
        }
        if(cardNumber.match("^62\\d{0,14}") !== null){
            return "unionpay";
        }
        if(cardNumber.match('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}') !== null){
            return "mastercard";
        }
        if(cardNumber.match('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}') !== null){
            return "diners";
        }
        if(cardNumber.match('^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}') !== null){
            return "maestro";
        }
    };
    function cardStyle(bank){
        switch(bank){  
            case("visa"):{
                cleanClassList()
                cardfrontTop.classList.add("lime-background");
                cardfrontBottom.classList.add("limedark-background");
                cardBackBackground.style.background = "#afb42b";
                clientCardLogo.style.background = "url('/svg/visa.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/visa-inp.svg') center / cover";
                break;
            }
            case("discover"):{
                cleanClassList()
                cardfrontTop.classList.add("purple-background");
                cardfrontBottom.classList.add("purpledark-background");
                cardBackBackground.style.background = "#7b1fa2";
                clientCardLogo.style.background = "url('/svg/discover.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/discover-inp.svg') center / cover";
                break;
            }
            case("american express"):{
                cleanClassList();
                cardfrontTop.classList.add("green-background");
                cardfrontBottom.classList.add("greendark-background");
                cardBackBackground.style.background = "#388e3c";
                clientCardLogo.style.background = "url('/svg/americanExpress.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/americanexpress-inp.svg') center / cover";
                break;
            }
            case("jcb"):{
                cleanClassList();
                cardfrontTop.classList.add("red-background");
                cardfrontBottom.classList.add("reddark-background");
                cardBackBackground.style.background = "#d32f2f";
                clientCardLogo.style.background = "url('/svg/jcb.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/jsb-inp.svg') center / cover";
                break;
            }
            case("mir"):{
                cleanClassList();
                cardfrontTop.classList.add("green-background");
                cardfrontBottom.classList.add("greendark-background");
                cardBackBackground.style.background = "#388e3c";
                clientCardLogo.style.background = "url('/svg/mir.svg') no-repeat center / contain";
                clientInpLogo.style.background = "url('/svg/mir.svg') no-repeat center / contain";
                break;
            }
            case("unionpay"):{
                cleanClassList();
                cardfrontTop.classList.add("cyan-background");
                cardfrontBottom.classList.add("cyandark-background");
                cardBackBackground.style.background = "#0097a7";
                clientCardLogo.style.background = "url('/svg/unionpay.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/unionpay-inp.svg') center / cover";
                break;
            }
            case("diners"):{
                cleanClassList();
                cardfrontTop.classList.add("orange-background");
                cardfrontBottom.classList.add("orangedark-background");
                cardBackBackground.style.background = "#ef6c00";
                clientCardLogo.style.background = "url('/svg/diners.svg') center / cover";
                clientInpLogo.style.background = "url('/svg/diners-inp.svg') center / cover";
                break;
            } 
            case("mastercard"):{
                cleanClassList();
                cardfrontTop.classList.add("lightblue-background");
                cardfrontBottom.classList.add("lightbluedark-background");
                cardBackBackground.style.background = "#0288D1";
                clientCardLogo.style.background = "url('/svg/mastercard.svg') no-repeat center / contain";
                clientInpLogo.style.background = "url('/svg/mastercard-inp.svg') center / cover";
                break;
            }
            case("maestro"):{
                cleanClassList();
                cardfrontTop.classList.add("yellow-background");
                cardfrontBottom.classList.add("yellowdark-background");
                cardBackBackground.style.background = "#f9a825";
                clientCardLogo.style.background = "url('/svg/maestro.svg') no-repeat center / contain";
                clientInpLogo.style.background = "url('/svg/maestro-inp.svg') center / cover";
                break;
            }
           default:{
                cleanClassList()
                cardBackBackground.style.background = "#616161";
                cardfrontTop.classList.add("grey-background");
                cardfrontBottom.classList.add("greydark-background");
                clientCardLogo.style.background = "";
                clientInpLogo.style.background = "";
            }
            
        }
    };
    function cleanClassList(){
        for(let i=0; i < cardBackground.children.length; i++){
            let className = cardBackground.children[i].classList.value;
            cardBackground.children[i].classList.remove(className);
        }
    };
    cardBtn.addEventListener("click", function() {
        paymentsBlock.forEach(element => {
            const cardNumberHide = inpCardnum.value.split(" ")
            clientCard.classList.remove("client__credit-active");
            const cardBlock = document.createElement("div");
            cardBlock.classList.add("client__block-info");

            const cardIntro = document.createElement("p");
            cardIntro.textContent = "Payment card";
            cardIntro.classList.add("client__block-intro");

            const cardText = document.createElement("p");
            cardText.classList.add("client__block-text");
            cardText.classList.add("client__block-cardnumbers");
            cardText.textContent = `${cardNumberHide[0]} ${cardNumberHide[1]} #### ####`;
            element.append(cardBlock);
            cardBlock.append(cardIntro)
            cardBlock.append(cardText);    
        });
        clearForm()
    });
    function clearForm(){
        cleanClassList();
        fillingForm.length = 0;
        cardBtn.classList.remove("active-btn");
        showCardnum.textContent = "0123 4567 8910 1112" ;
        showName.textContent = "JOHN DOE" ;
        showNameBack.textContent = "JOHN DOE";
        showDate.textContent = "01/23" ;
        showCvc.textContent = "985" ;
        cardsCredit.classList.remove("client-rotate");
        cardBackBackground.style.background = "#616161";
        cardfrontTop.classList.add("grey-background");
        cardfrontBottom.classList.add("greydark-background");
        clientCardLogo.style.background = "";
        clientInpLogo.style.background = "";
        cardForm.reset();;
    };
};
