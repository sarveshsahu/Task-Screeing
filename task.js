const scheduling = (tasks,dependencies)=> { // scheduling function 
    let result = [], // final result is stored in it
        checked = {}, // dependencies checked
        dependencyObj = {}; 
    dependencies.forEach(dependency => { // create an object with each keys having all its dependencies 
        let task = dependency.split(' => ')
        if (dependencyObj[task[0]]) {
            dependencyObj[task[0]].push(task[1])
        }
        else {
            dependencyObj[task[0]] = [task[1]]
        }
    })
    tasks.forEach(task => {
        if (Object.keys(dependencyObj).indexOf(task) == -1) {
            dependencyObj[task] = []
        }
    })
    // checking the dependency on each key
    Object.keys(dependencyObj).forEach(function check(dependencyKey, checkedDependency) {
        if (!Array.isArray(checkedDependency)) checkedDependency = []; // uses the index parameter to store the dependency array
        checkedDependency.push(dependencyKey);
        checked[dependencyKey] = true; // store the visited key in checked array
        dependencyObj[dependencyKey].forEach(function (value) {
            if (checkedDependency.indexOf(value) >= 0) // check cyclic dependency
                throw new Error('Error - this is a cyclic dependency');
            if (checked[value]) return;
            check(value, checkedDependency.slice(0));  // recursive calling 
        });
        if (result.indexOf(dependencyKey) < 0) result.push(dependencyKey);
    });
    return result;
}
module.exports = {scheduling }
