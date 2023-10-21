import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({ selectedTechnologies, setTechnologies}) {

  const handleTagsChange = (event, childTechnologies) => {
    setTechnologies(prev=>{return {...prev,technologies: childTechnologies}})
  };

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={top100Films.map((option) => option.title)}
        defaultValue={[top100Films[13].title]}
        freeSolo
        value={selectedTechnologies}
        onChange={handleTagsChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip  label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="standard"
            placeholder="Technologies"
          />
        )}
      />
    </Stack>
  );
}


const top100Films =[
  {
    "title": "JavaScript",
    "name": "JavaScript"
  },
  {
    "title": "Python",
    "name": "Python"
  },
  {
    "title": "Java",
    "name": "Java"
  },
  {
    "title": "React",
    "name": "React"
  },
  {
    "title": "Docker",
    "name": "Docker"
  },
  {
    "title": "C++",
    "name": "C++"
  },
  {
    "title": "Kubernetes",
    "name": "Kubernetes"
  },
  {
    "title": "Ruby on Rails",
    "name": "Ruby on Rails"
  },
  {
    "title": "Swift",
    "name": "Swift"
  },
  {
    "title": "TensorFlow",
    "name": "TensorFlow"
  },
  {
    "title": "PHP",
    "name": "PHP"
  },
  {
    "title": "Node.js",
    "name": "Node.js"
  },
  {
    "title": "HTML5",
    "name": "HTML5"
  },
  {
    "title": "CSS3",
    "name": "CSS3"
  },
  {
    "title": "Go",
    "name": "Go"
  },
  {
    "title": "Angular",
    "name": "Angular"
  },
  {
    "title": "Vue.js",
    "name": "Vue.js"
  },
  {
    "title": "SQL",
    "name": "SQL"
  },
  {
    "title": "MongoDB",
    "name": "MongoDB"
  },
  {
    "title": "ASP.NET",
    "name": "ASP.NET"
  },
  {
    "title": "Ruby",
    "name": "Ruby"
  },
  {
    "title": "Perl",
    "name": "Perl"
  },
  {
    "title": "Rust",
    "name": "Rust"
  },
  {
    "title": "Scala",
    "name": "Scala"
  },
  {
    "title": "Kotlin",
    "name": "Kotlin"
  },
  {
    "title": "Elixir",
    "name": "Elixir"
  },
  {
    "title": "TypeScript",
    "name": "TypeScript"
  },
  {
    "title": "Spring Boot",
    "name": "Spring Boot"
  },
  {
    "title": "Hadoop",
    "name": "Hadoop"
  },
  {
    "title": "Unity",
    "name": "Unity"
  },
  {
    "title": "Arduino",
    "name": "Arduino"
  },
  {
    "title": "Raspberry Pi",
    "name": "Raspberry Pi"
  },
  {
    "title": "Laravel",
    "name": "Laravel"
  },
  {
    "title": "Vue.js",
    "name": "Vue.js"
  },
  {
    "title": "GraphQL",
    "name": "GraphQL"
  },
  {
    "title": "Express.js",
    "name": "Express.js"
  },
  {
    "title": "AWS Lambda",
    "name": "AWS Lambda"
  },
  {
    "title": "Flask",
    "name": "Flask"
  },
  {
    "title": "Haskell",
    "name": "Haskell"
  },
  {
    "title": "OpenGL",
    "name": "OpenGL"
  },
  {
    "title": "Bootstrap",
    "name": "Bootstrap"
  },
  {
    "title": "Sass",
    "name": "Sass"
  },
  {
    "title": "Django",
    "name": "Django"
  },
  {
    "title": "Vue.js",
    "name": "Vue.js"
  },
  {
    "title": "Elasticsearch",
    "name": "Elasticsearch"
  },
  {
    "title": "Redis",
    "name": "Redis"
  },
  {
    "title": "PostgreSQL",
    "name": "PostgreSQL"
  },
  {
    "title": "C#",
    "name": "C#"
  }
];