import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import _ from 'lodash';
import { timeAgo } from '../../utils/Helpers';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiInputBase-input': {
      color: 'black',
    },
  },
}));

const OneUpFeed = ({ oneUps, handleNav, isUserDetail, isSubmissionDetail }) => {
  const [sortedOneUps, setSortedOneUps] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setSortedOneUps(
      _.sortBy(oneUps, oneUp => {
        return new Date(oneUp.fields.createdAt).getTime();
      }).reverse(),
    );
  }, [oneUps]);

  return (
    <List component="nav" aria-label="main mailbox folders">
      {sortedOneUps.map(oneUp => {
        return (
          <ExpansionPanel key={oneUp.id}>
            <ExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ListItem>{isUserDetail ? oneUp.status.icon : null}</ListItem>
              <ListItem>
                <TextField
                  className={classes.root}
                  disabled
                  id="outlined-disabled"
                  label="Sender"
                  defaultValue={oneUp.fields.sender}
                  variant="outlined"
                />
              </ListItem>
              <ListItem>
                <TextField
                  className={classes.root}
                  disabled
                  id="outlined-disabled"
                  label="Time"
                  defaultValue={timeAgo(oneUp.fields.createdAt)}
                  variant="outlined"
                />
              </ListItem>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TextField
                className={classes.root}
                disabled
                id="outlined-disabled"
                label="Details"
                defaultValue={`${
                  isUserDetail || isSubmissionDetail
                    ? oneUp.fields.chatTitle
                    : null
                } ->
               ${
                 isUserDetail || isSubmissionDetail
                   ? oneUp.fields.message
                   : null
               }`}
                variant="outlined"
              />
              {!isUserDetail ? oneUp.fields.username : null}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </List>
  );
};

export default OneUpFeed;
