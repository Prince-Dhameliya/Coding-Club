import React, { useEffect, useState } from "react";

// next js components
import Link from "next/link";

// components
import { Btn } from "..";
import { useRouter } from "next/router";

// icons
import {
  FiBookmark,
  FiExternalLink,
  FiMessageCircle,
  FiTriangle,
} from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";

// axios for data fetching
import axios from "axios";

// fetching and editing data
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const DropItem = ({chapter, checked, setChecked}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    let flag = true;
    for(let i = 0; i < chapter?.categories?.length; i++) {
      if(checked.indexOf(chapter?.categories[i]) === -1) flag = false;
    }

    const [checked1, setChecked1] = React.useState(flag);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleToggle1 = (chapter) => () => {
      const categories = chapter?.categories;
      const newChecked = [...checked];
      if (!checked1) {
        for(let i = 0; i < categories.length; i++) {
          if(newChecked.indexOf(categories[i]) === -1) newChecked.push(categories[i]);
        }
      } else {
        for(let i = 0; i < categories.length; i++) {
          const currentIndex = newChecked.indexOf(categories[i]);
          if(currentIndex !== -1) {
            newChecked.splice(currentIndex, 1);
          }
        }
      }
      setChecked(newChecked);
      setChecked1(prev => !prev);
    };

    let labelId = `checkbox-list-secondary-label-${chapter}`;
    return (
        <>
            <ListItem style={{width: "100%", background: "white"}} button onClick={handleClick}>
                {/* <ListItemAvatar>
                    <Avatar
                    alt={`Avatar n°${chapter + 1}`}
                    src={`/static/images/avatar/${chapter + 1}.jpg`}
                    />
                </ListItemAvatar> */}
                <ListItemText id={labelId} primary={`${chapter.name}`} />
                <ListItemSecondaryAction>
                    <Checkbox
                    edge="end"
                    onChange={handleToggle1(chapter)}
                    checked={checked1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemSecondaryAction>
                {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {chapter.categories.map((category, index) => {
                    return <DoubleDropItem key={index} category={category} checked={checked} setChecked={setChecked} setChecked1={setChecked1} categories={chapter.categories} />
                  })}
                </List>
            </Collapse>
        </>
    );
};

const DoubleDropItem = ({category, checked, setChecked, setChecked1, categories}) => {
  const labelId = `checkbox-list-secondary-label-${category}`;
  const classes = useStyles();

  const handleToggle3 = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      let flag = true;
      for(let i = 0; i < categories.length; i++) {
        if(categories[i] !== value && newChecked.indexOf(categories[i]) === -1) flag = false;
      }
      setChecked1(flag);
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      setChecked1(false);
    }

    setChecked(newChecked);
  };

  return (
    <ListItem button className={classes.nested}>
        {/* <ListItemIcon>
          <StarBorder />
        </ListItemIcon> */}
        <ListItemText id={labelId} primary={`${category}`} />
        <ListItemSecondaryAction>
            <Checkbox
            edge="end"
            onChange={handleToggle3(category)}
            checked={checked.indexOf(category) !== -1}
            inputProps={{ 'aria-labelledby': labelId }}
            />
        </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DropItem;
