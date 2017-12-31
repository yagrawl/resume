var resume;
var details = {
    name: {},
    contact: {},
    experience: [],
    college: [],
    projects: [],
    skills: []
};

function getName() {
    details.name.firstname = document.getElementById('firstname').value;
    details.name.lastname = document.getElementById('lastname').value;
    breakdown();
    build('contact');
}

function getContact() {
    details.contact.website = document.getElementById('website').value;
    details.contact.email = document.getElementById('email').value;
    details.contact.github = document.getElementById('github').value;
    details.contact.number = document.getElementById('number').value;
    details.contact.linkedin = document.getElementById('linkedin').value;
    details.contact.location = document.getElementById('location').value;
    breakdown();
    build('experience');

}

function getExperience() {
    details.experience.push({
        company: document.getElementById('companyname').value,
        position: document.getElementById('position').value,
        duration: document.getElementById('duration').value,
        location: document.getElementById('location').value,
        description: document.getElementById('descriptionExp').value
    });
    breakdown();
    build('college');
}

function getCollege() {
    details.college.push({
        name: document.getElementById('collegename').value,
        major: document.getElementById('major').value,
        duration: document.getElementById('collegeduration').value,
        courses: document.getElementById('courses').value,
    });
    breakdown();
    build('projects');
}

function getProjects() {
    details.projects.push({
        name: document.getElementById('projectname').value,
        url: document.getElementById('url').value,
        description: document.getElementById('projectdescription').value,
    });
    breakdown();
    build('skills');
}

function getSkills() {
    details.skills.push({
        skilldiv: document.getElementById('skillarea').value,
        skills: document.getElementById('skills').value.split(','),
    });
    breakdown();
    buildResume();
}

function build(status){

    var body = document.getElementsByTagName('body')[0];
    var form = document.createElement('div');
    var maintext = document.createElement('p');
    var submit = document.createElement('input');
    var addmore = document.createElement('input');

    submit.className = 'submit-button';
    submit.type = 'submit';

    addmore.className = 'add-more-button';
    addmore.type = 'submit';
    addmore.value = '+';

    form.className = 'input-area';
    form.id = 'input-area';
    maintext.className = 'input-text-main';

    var addmoreFlag = 0;

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
            maintext.textContent = 'Experience';
            form.appendChild(maintext);

            form = createExperience(form);
            submit.value = 'Next';
            addmore.setAttribute('onclick','addMoreExperience()');
            submit.setAttribute('onclick','getExperience()');
            addmoreFlag = 1;
            break;

        case 'college':
            maintext.textContent = 'College';
            form.appendChild(maintext);

            form = createCollege(form);
            submit.value = 'Next';
            addmore.setAttribute('onclick','addMoreCollege()');
            submit.setAttribute('onclick','getCollege()');
            addmoreFlag = 1;
            break;

        case 'projects':
            maintext.textContent = 'Projects';
            form.appendChild(maintext);

            form = createProject(form)
            submit.value = 'Next';
            addmore.setAttribute('onclick','addMoreProjects()');
            submit.setAttribute('onclick','getProjects()');
            addmoreFlag = 1;
            break;

        case 'skills':
            maintext.textContent = 'Skills';
            form.appendChild(maintext);

            form = createSkills(form)
            submit.value = 'Submit';
            addmore.setAttribute('onclick','addMoreSkills()');
            submit.setAttribute('onclick','getSkills()');
            addmoreFlag = 1;
            break;

        default:
            alert('Error');
    }

    var padding = document.createElement('p');

    if(addmoreFlag) {
        padding.appendChild(addmore);
    }

    padding.appendChild(submit);
    form.appendChild(padding);
    body.appendChild(form);

}

function createExperience(form) {
    var inputs = ['Company Name', 'Position', 'Duration', 'Location'];

    inputs.forEach(function(label) {
        var input = document.createElement('input');
        input.className = 'text-bar input-text';
        input.style.width = '45%';
        input.type = 'text';
        input.placeholder = label;
        input.id = label.replace(/\s/g,'').toLowerCase();
        form.appendChild(input);
    });

    var bigtext = document.createElement('textarea');
    bigtext.className = 'text-area input-text'
    bigtext.wrap = 'hard';
    bigtext.rows = '3';
    bigtext.placeholder = 'Description';
    bigtext.id = 'descriptionExp';
    form.appendChild(bigtext);

    return form;
}

function createCollege(form) {
    var input = document.createElement('input');
    input.className = 'text-bar input-text';
    input.style.width = '92%';
    input.type = 'text';
    input.placeholder = 'College Name';
    input.id = 'collegename';
    form.appendChild(input);

    var inputs = ['Major', 'College Duration'];
    inputs.forEach(function(label) {
        var input = document.createElement('input');
        input.className = 'text-bar input-text';
        input.style.width = '45%';
        input.type = 'text';
        input.placeholder = label;
        input.id = label.replace(/\s/g,'').toLowerCase();
        form.appendChild(input);
    });

    var bigtext = document.createElement('textarea');
    bigtext.className = 'text-area input-text'
    bigtext.wrap = 'hard';
    bigtext.rows = '3';
    bigtext.placeholder = 'Courses';
    bigtext.id = 'courses';
    form.appendChild(bigtext);
    return form;
}

function createProject(form) {
    var inputs = ['Project Name', 'Url'];
    inputs.forEach(function(label) {
        var input = document.createElement('input');
        input.className = 'text-bar input-text';
        input.style.width = '45%';
        input.type = 'text';
        input.placeholder = label;
        input.id = label.replace(/\s/g,'').toLowerCase();
        form.appendChild(input);
    });

    var bigtext = document.createElement('textarea');
    bigtext.className = 'text-area input-text'
    bigtext.wrap = 'hard';
    bigtext.rows = '3';
    bigtext.placeholder = 'Project Description';
    bigtext.id = 'projectdescription';
    form.appendChild(bigtext);
    return form;
}

function createSkills(form) {

    var input = document.createElement('input');
    input.className = 'text-bar input-text';
    input.type = 'text';
    input.placeholder = 'Skill Area';
    input.id = 'skillarea';
    form.appendChild(input);

    var input = document.createElement('input');
    input.className = 'text-bar input-text';
    input.style.width = '92%';
    input.type = 'text';
    input.placeholder = 'Skills (comma seperated list)';
    input.id = 'skills';
    form.appendChild(input);

    return form;
}

function addMoreExperience() {
    details.experience.push({
        company: document.getElementById('companyname').value,
        position: document.getElementById('position').value,
        duration: document.getElementById('duration').value,
        location: document.getElementById('location').value,
        description: document.getElementById('descriptionExp').value
    });
    breakdown();
    build('experience');
}

function addMoreCollege() {
    details.college.push({
        name: document.getElementById('collegename').value,
        major: document.getElementById('major').value,
        duration: document.getElementById('collegeduration').value,
        courses: document.getElementById('courses').value,
    });
    breakdown();
    build('college');
}

function addMoreProjects() {
    details.projects.push({
        name: document.getElementById('projectname').value,
        url: document.getElementById('url').value,
        description: document.getElementById('projectdescription').value,
    });
    breakdown();
    build('projects');
}

function addMoreSkills() {
    details.skills.push({
        skilldiv: document.getElementById('skillarea').value,
        skills: document.getElementById('skills').value,
    });
    breakdown();
    build('skills');
}

function breakdown() {
    var form = document.getElementById('input-area');
    form.parentNode.removeChild(form);
}

function buildResume() {
    localStorage.details = details;
    console.log(details);
}
