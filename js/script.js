var resume;

function getName() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    breakdown();
    build('contact');
}

function getContact() {
    var website = document.getElementById('website').value;
    var email = document.getElementById('email').value;
    var github = document.getElementById('github').value;
    var number = document.getElementById('number').value;
    var linkedin = document.getElementById('linkedin').value;
    var location = document.getElementById('location').value;
    breakdown();
    build('experience');

}

function build(status){

    var body = document.getElementsByTagName('body')[0];
    var form = document.createElement('div');
    var maintext = document.createElement('p');
    var submit = document.createElement('input');

    submit.className = 'submit-button';
    submit.type = 'submit';
    form.className = 'input-area';
    form.id = 'input-area';
    maintext.className = 'input-text-main';

    switch (status) {
        case 'contact':
            maintext.textContent = 'Contact Info';
            form.appendChild(maintext);
            var socialclass = [['fa fa-globe fa-2x', 'Website'],
                               ['fa fa-user-o fa-2x', 'Email'],
                               ['fa fa-github fa-2x', 'Github'],
                               ['fa fa-phone-square fa-2x', 'Number'],
                               ['fa fa-linkedin-square fa-2x', 'LinkedIn'],
                               ['fa fa-location-arrow fa-2x', 'Location']];

            socialclass.forEach(function(icon) {
                var socialicon = document.createElement('i');
                var input = document.createElement('input');
                var br = document.createElement('br');

                socialicon.className = icon[0];
                input.className = 'text-bar input-text';
                input.type = 'text';
                input.placeholder = icon[1];
                input.id = icon[1].toLowerCase();

                form.appendChild(socialicon);
                form.appendChild(input);
                form.appendChild(br);

            });

            submit.value = 'Next';
            submit.setAttribute('onclick','getContact()');

            break;

        case 'experience':
            alert('experience');
            break;

        default:
            alert('Error');
    }

    var padding = document.createElement('p');

    padding.appendChild(submit);
    form.appendChild(padding);
    body.appendChild(form);

}

function breakdown() {
    var form = document.getElementById('input-area');
    form.parentNode.removeChild(form);
}
