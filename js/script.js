var resume;
var details = {
    name: {},
    contact: {},
    experience: [],
    college: [],
    projects: [],
    skills: []
};

function checkStatus() {
    var retrievedObject = localStorage.getItem('storeDetails');
    if(typeof retrievedObject.name !== 'undefined') {
        details = localStorage.details;
        buildResume(1);
    }
}

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
        skills: document.getElementById('skills').value,
    });
    breakdown();
    storage();
    buildResume(0);
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

function storage() {
    localStorage.setItem('storeDetails', JSON.stringify(details));
}

function buildResume(flag) {
    if(flag){
        var details = localStorage.getItem('storeDetails');
    }
    var title = document.getElementsByTagName('title')[0];
    var body = document.getElementsByTagName('body')[0];
    var page = document.createElement('div');
    page.className = 'page';
    title.textContent = 'Resume';

    var intro = document.createElement('div');
    intro.className = 'intro';
    var name = document.createElement('div');
    name.className = 'name';

    var firstName = document.createElement('p');
    var lastName = document.createElement('span');
    firstName.className = 'first-name';
    lastName.className = 'last-name';
    firstName.textContent = details.name.firstname.toUpperCase() + ' ';
    lastName.textContent = details.name.lastname.toUpperCase();

    var contact = document.createElement('div');
    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://' + details.contact.website;
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.website;

    a.appendChild(p);
    td.appendChild(a);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.style.paddingLeft = '5em';
    var a = document.createElement('a');
    a.target = '_blank';
    a.href = 'mailto:' + details.contact.email;
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.email;

    a.appendChild(p);
    td.appendChild(a);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://' + details.contact.github;
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.github;

    a.appendChild(p);
    td.appendChild(a);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.style.paddingLeft = '5em';
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.number;

    td.appendChild(p);
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://' + details.contact.linkedin;
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.linkedin;

    a.appendChild(p);
    td.appendChild(a);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.style.paddingLeft = '5em';
    var p = document.createElement('p');
    p.className = 'contact-detail';
    p.textContent = details.contact.location;

    td.appendChild(p);
    tr.appendChild(td);
    table.appendChild(tr);

    contact.appendChild(table);

    firstName.appendChild(lastName);
    name.appendChild(firstName);
    intro.appendChild(name);
    intro.appendChild(contact);
    var left = document.createElement('div');
    left.style.clear = 'left';
    intro.appendChild(left);
    page.appendChild(intro);

    var experience = document.createElement('div');
    experience.className = 'section';
    var p = document.createElement('p');
    var hr = document.createElement('hr');
    hr.style.marginTop = '-5px';
    p.className = 'section-title';
    p.textContent = 'EXPERIENCE';

    experience.appendChild(p);
    experience.appendChild(hr);

    for(let i = 0; i < details.experience.length; i++) {
        var dets = document.createElement('div');
        dets.className = 'details';

        var p = document.createElement('p');
        var span = document.createElement('span');

        p.className = 'details-title';
        span.className = 'location';

        p.textContent = details.experience[i].company + ' ';
        span.textContent = details.experience[i].location.toUpperCase();
        p.appendChild(span);
        dets.appendChild(p);

        var p = document.createElement('p');
        var span = document.createElement('span');
        var italics = document.createElement('i');

        p.className = 'position';
        span.className = 'duration';


        p.textContent = details.experience[i].position + ' · ';
        span.textContent = details.experience[i].duration;
        italics.appendChild(span);
        p.appendChild(italics);
        dets.appendChild(p);

        var p = document.createElement('p');
        p.className = 'summary';
        p.textContent = details.experience[i].description;
        dets.appendChild(p);

        experience.appendChild(dets);
    }
    page.appendChild(experience);

    var college = document.createElement('div');
    college.className = 'section';
    var p = document.createElement('p');
    var hr = document.createElement('hr');
    hr.style.marginTop = '-5px';
    p.className = 'section-title';
    p.textContent = 'EDUCATION';

    college.appendChild(p);
    college.appendChild(hr);

    for(let i = 0; i < details.college.length; i++) {
        var dets = document.createElement('div');
        dets.className = 'details';

        var p = document.createElement('p');
        var span = document.createElement('span');

        p.className = 'details-title';

        p.textContent = details.college[i].name;
        dets.appendChild(p);

        var p = document.createElement('p');
        var span = document.createElement('span');
        var italics = document.createElement('i');

        p.className = 'position';
        span.className = 'duration';


        p.textContent = details.college[i].major + ' · ';
        span.textContent = details.college[i].duration;
        italics.appendChild(span);
        p.appendChild(italics);
        dets.appendChild(p);

        var p = document.createElement('p');
        p.className = 'summary';
        p.textContent = details.college[i].courses;
        dets.appendChild(p);

        college.appendChild(dets);
    }
    page.appendChild(college);

    var projects = document.createElement('div');
    projects.className = 'section';
    var p = document.createElement('p');
    var hr = document.createElement('hr');
    hr.style.marginTop = '-5px';
    p.className = 'section-title';
    p.textContent = 'PROJECTS';

    projects.appendChild(p);
    projects.appendChild(hr);

    for(let i = 0; i < details.projects.length; i++) {
        var dets = document.createElement('div');
        dets.className = 'details';

        var p = document.createElement('p');
        var span = document.createElement('span');

        p.className = 'details-title';
        span.className = 'location';

        p.textContent = details.projects[i].name + ' ';
        span.textContent = details.projects[i].url;
        p.appendChild(span);
        dets.appendChild(p);

        var p = document.createElement('p');
        p.className = 'summary';
        p.textContent = details.projects[i].description;
        dets.appendChild(p);

        projects.appendChild(dets);
    }
    page.appendChild(projects);

    var skills = document.createElement('div');
    skills.className = 'section';
    var p = document.createElement('p');
    var hr = document.createElement('hr');
    hr.style.marginTop = '-5px';
    p.className = 'section-title';
    p.textContent = 'SKILLS';

    skills.appendChild(p);
    skills.appendChild(hr);

    var dets = document.createElement('div');
    dets.className = 'details';

    var table = document.createElement('table');

    for(let i = 0; i < details.skills.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var p = document.createElement('p');
        p.className = 'skill-class';
        p.textContent = details.skills[i].skilldiv.toUpperCase();

        td.appendChild(p);
        tr.appendChild(td);

        var td = document.createElement('td');
        td.style.paddingLeft = '5em';
        var p = document.createElement('p');
        p.className = 'skill-set';
        p.textContent = details.skills[i].skills.replace(',', ' ·');

        td.appendChild(p);
        tr.appendChild(td);

        table.appendChild(tr);
    }

    dets.appendChild(table);
    skills.appendChild(dets);

    page.appendChild(skills);

    body.appendChild(page);
}
