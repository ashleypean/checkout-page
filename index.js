const countries = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State Of", "Bonaire, Sint Eustatius And Saba", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State Of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension And Tristan Da Cunha", "Saint Kitts And Nevis", "Saint Lucia", "Saint Martin (french Part)", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic Of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
  
//Create jQuery UI autocomplete dropdown menu 
$('#country').autocomplete({source: countries})


const listItems = $('ul.cart-contents').children()

$(listItems).each(function(index) { 
  //Store id of each list item in variable 
  const id = $(this).attr('id')

  //Add event listener for subtraction
  $(`#${id} .subtract-quantity`).click(() => changeQuantity(id, 'subtract'))

    //Add event listener for addition
    $(`#${id} .add-quantity`).click(() => changeQuantity(id, 'add'))

})



function changeQuantity(id, str) {
  let value = Number($(`#${id} p.counter`).text())

  //Conditional to check and prevent negative values 
  if(value === 0 && str === 'subtract') 
    return;
  //Incrementor decrement counter according to passed in assignment value
  else {
    str === 'subtract' ? --value : ++value
    $(`#${id} p.counter`).text(value)

    //Call function to change total price in cart
    changeTotal(id, str)
  }

}

const changeTotal = (id, str) => {
  let currentTotal = Number($('p.total').attr('value'))
  const itemPrice = Number($(`#${id} .discounted-price`).attr('value'))
  
  //Increment or decrement according to user input
  str === 'subtract' ? currentTotal-=itemPrice : currentTotal+=itemPrice

  //Change text and value attribute of total cost on page
  $('p.total').attr('value', currentTotal.toFixed(2))
  $('p.total').text(`$${currentTotal.toFixed(2)}`)
}

//HANDLE FORM SUBMISSION
$('form').submit(e => {
  e.preventDefault()

  const children = Array.from($('form input'))
 
  //ONLY USE PROP, ATTR WILL STORE DEFAULT VALUE, NOT CURRENT VALUE
  const checked = $(children[7]).prop('checked')

  //Remove checked value from array, not needed after value is set once 

  if(checked)  {
    children.forEach(input => {
      const inputName = $(input).prop('id')
      const inputValue = $(input).prop('value')
      localStorage.setItem(inputName, inputValue)
    })
  }

  for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.getItem(localStorage.key(i)))
  }

  $('.modal').dialog({
    appendTo: 'body',
    modal: true, 
    title: 'Order Confirmation',
    closeText: 'close', 
    draggable: false, 
    resizable: false
  })

})
