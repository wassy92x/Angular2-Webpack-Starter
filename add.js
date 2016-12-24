const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const ArgumentParser = require("argparse").ArgumentParser;

//***************************************************//
// Define Functions
//***************************************************//

String.prototype.toKebabCase = function () {
    return this.replace(/\W+/g, '-')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};

String.prototype.toCamelCase = function () {
    return this.replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
    });
};

String.prototype.toClassName = function () {
    let str = this.toCamelCase();
    return str.substr(0, 1).toUpperCase() + str.substr(1);
};

function writeComponentTS(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".component.ts"),
        `import {Component} from "@angular/core";

@Component({
    selector: "app-` + name + `",
    templateUrl: "./` + name + `.component.html",
    styleUrls: ["` + name + `.component.scss"]
})
export class ` + name.toClassName() + `Component {

}
`
    );
}

function writeComponentSass(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".component.scss"),
        "app-" + name + " {\n\n\n}\n");
}

function writeComponentHTML(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".component.html"), "");
}

function writeService(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".service.ts"),
        `import {Injectable} from "@angular/core";

@Injectable()
export class ` + name.toClassName() + `Service {

}
`
    );
}

function writeProvider(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".provider.ts"),
        `import {Injectable} from "@angular/core";

@Injectable()
export class ` + name.toClassName() + `Provider {

}
`
    );
}

function writeModel(destPath, name) {
    fs.writeFileSync(path.join(destPath, name + ".model.ts"),
    `export class ` + name.toClassName() + ` {

}
`
    );
}

function createDestFolders(name) {
    let destPath = path.join.apply(null, arguments);
    mkdirp.sync(destPath);
    return destPath;
}
//***************************************************//
// END Define Functions
//***************************************************//


//***************************************************//
// Main
//***************************************************//
let argParser = new ArgumentParser();
argParser.addArgument(["-t", "--type"], {
    choices: ["component", "page", "service", "provider", "model"],
    required: true,
    dest: "type"
});
argParser.addArgument("--omitShared", {
    action: "storeTrue"
});
argParser.addArgument(["-r", "--root"], {
    defaultValue: path.join(__dirname, "src", "app"),
    dest: "root"
});
argParser.addArgument(["-n", "--name"], {
    required: true,
    dest: "name"
});
let argv = argParser.parseArgs();
argv.name = argv.name.toKebabCase();
if (argv.type === "service" || argv.type === "provider" || argv.type === "models") {
    if (!argv.omitShared)
        argv.root = path.join(argv.root, "shared");
}

let destPath;
try {
    switch (argv.type) {
        case "component":
        case "page":
            destPath = createDestFolders(argv.root, argv.name);
            writeComponentTS(destPath, argv.name);
            writeComponentHTML(destPath, argv.name);
            writeComponentSass(destPath, argv.name);
            break;
        case "service":
            destPath = createDestFolders(argv.root, "services");
            writeService(destPath, argv.name);
            break;
        case "provider":
            destPath = createDestFolders(argv.root, "providers");
            writeProvider(destPath, argv.name);
            break;
        case "model":
            destPath = createDestFolders(argv.root, "models");
            writeModel(destPath, argv.name);
            break;
    }
} catch (e) {
    console.error("Can't create " + argv.name);
    console.error(e);
}
//***************************************************//
// END Main
//***************************************************//
