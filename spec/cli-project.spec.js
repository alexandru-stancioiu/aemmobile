/**
	Copyright (c) 2016 Adobe Systems Incorporated. All rights reserved.

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
 */
"use strict"

var helpers = require('./helpers');
var cli = require("../src/aemm-cli");
var Q = require('q');
var project = require('../src/project');

describe("aemm cli project", function () {
    beforeEach(function () {
        // Event registration is currently process-global. Since all jasmine
        // tests in a directory run in a single process (and in parallel),
        // logging events registered as a result of the "--verbose" flag in
        // CLI testing below would cause lots of logging messages printed out by other specs.
        spyOn(console, 'log');
		spyOn(process.stderr, 'write');
    });

	describe("create", function () {

		beforeEach(function () {
			spyOn(project, 'create');
		});

		it("will call project create", function (done) {
			let projectName = "TestProject";
			cli(["node", "aemm", "project", "create", projectName], () => {
				expect(project.create.calls.mostRecent().args[0].argv).not.toBeNull();
				expect(project.create.calls.mostRecent().args[1]).toMatch(projectName);
				done();
			});
		});

	});

		it("will fail if an invalid subcommand is called", function (done) {
			cli(["node", "aemm", "project", "bogus"], (err) => {
				expect(err.message).toBe("aemm project does not have a subcommand of 'bogus'; try 'aemm help project' for a list of all the available sub commands within project.");
				done();
			});
		});
	
 
});
