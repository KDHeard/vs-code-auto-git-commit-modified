Prompting Environment Rules - (Version 1.0.1 – 24 March 2025)

Calculating local time and associated timestamp: 
    Whenever you generate a code file for me, please include a timestamp as a header at the top of the file. The timestamp must reflect the current, actual time in New Zealand (NZDT) at the moment of generation. To do this, first determine the current time in New Zealand by calculating the time in NZDT (UTC+13 during daylight saving time, which applies from the last Sunday of September to the first Sunday of April; otherwise, use NZST, UTC+12). Then, format the timestamp as follows

    The format for the timestamp should be:
    [Day], DD-MMM-YYYY at [Time] [Time Zone]
    //Example: Tuesday, 25-Mar-2025 at 04:08 AM NZDT

Provide all feedback with a timestamp (based on local time) and a header using the structure below.
 
 [Day], DD-MMM-YYYY at [Time] [Time Zone] – Milestone being worked on

    a. Executive summary – (Briefly state the milestone, steps taken, and results.)
    b. Progress log – refer the example below
    c. Current Issue/s – (List milestone actions being worked on.)
    d. Next steps or fix/es
    e. Checklist of Actions – 

Use a hierarchical numbering for Checklist of Actions: 1.0 for major actions, --> 1.1 for sub-objectives. An example of this is provided below. Include status in square brackets: [Incomplete], [Complete], [On Hold], [Deferred], [Cancelled].

Example:
Step 1.0 First sub-objective of the milestone [Incomplete]
    --> 1.1 First sub action [Complete]
        ---->1.1.1 Frist sub sub action [Complete]
        ----> 1.1.2 Secon sub sub action [Complete]
    --> 1.2 Second sub-objective of the mile [Incomplete]
Step 2.0 Second action [Incomplete]

For this feedback structure maintain the milestone numbering throughout all replies. Please maintain the indent prefixes (-->and ---->) for each level as indicated above.

I will provide my feedback in the format: '1.1 -> did this and that: the result -> did something else: the result | 2.1 -> did this and that: the result'. For efficiency I will reference the VS Code main screen as VSM and the extension development host as EDH. 

Code file generation: 
    Whenever you generate a code file for me, please include a timestamp as a header at the top of the file. The timestamp should reflect the current time in New Zealand (NZDT) and follow this format:

    // Version X.Y: [Day], DD-MMM-YYYY at [Time] [Time Zone] – File Name | Description of change for edits
    // Example: "Version 1.15: Tuesday, 25 March 2025 at 04:08 AM NZDT – package.json | Updated linter"

Provide me the full file contents for any code changes you require to a file to ensure efficiency and reduce errors. When you require me to complete actions such as run an instruction in a terminal, provide the code snippet to do so in reply bubble that allows me to copy the code easily. Provide all required actions eg.: ‘ls out’ and code etc. in the Text Fields within the Grok window to allow me to easily copy it. 

Don’t not add version headers to json files as this in not permitted in json files. 

Progress Log: 
    Please provide CHANGELOG.md entry with every reply using the format below:

    //[Day], DD-MMM-YYYY at [Time] [Time Zone] – Summary of change from previous Grok reply and assocaited user feedback
    //Example: "Tuesday, 25 March 2025 at 04:08 AM NZDT - Git repository issues resolved. User updated cfaExtension.ts to Version 1.15, confirmed detailed problem logging, handoff process working, re-enabled Git and GitLens.”.

Prompt me to create the PROGRESS.log when we first initiate the project in VS code. I will log all progress logs provided manually to this file. 
