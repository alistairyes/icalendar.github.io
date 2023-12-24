import json

def process_course_data(file_path):
    # Dictionary to hold the course data
    courses = {}

    # Read data from file
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split('\t')
            if len(parts) < 15:
                continue  # Skip incomplete lines

            crn, subj, crse, sec, cmp, cred, title, days, time, cap, act, rem, instructor, date_range, location = parts[:15]
            
            if title not in courses:
                courses[title] = []

            course_info = {
                "crn": crn,
                "time": time,
                "instructor": instructor,
                "location": location,
                "days": days
            }
            courses[title].append(course_info)

    return courses

def save_to_json(courses, output_file):
    # Save to JSON file
    with open(output_file, 'w') as file:
        json.dump(courses, file, indent=4)

# Path to your text file containing the course data
file_path = 'courses.txt'
courses = process_course_data(file_path)
save_to_json(courses, 'courses.json')

